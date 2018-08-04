# frozen_string_literal: true

class JsonWebToken
  class << self
    def decode(token)
      JWT.decode(
        token, nil,
        true, # Verify the signature of this token
        algorithm: 'RS256',
        iss: "https://#{auth0_domain}/",
        verify_iss: true,
        aud: auth0_client_id,
        verify_aud: true,
      ) do |header|
        jwks_hash[header['kid']]
      end
    end

    def jwks_hash
      Array(jwks_raw['keys']).map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(
            Base64.decode64(k['x5c'].first),
          ).public_key,
        ]
      end.to_h
    end

    private

    def jwks_raw
      @jwks_raw ||=
        begin
          response = Faraday.get("https://#{File.join(auth0_domain.to_s, '.well-known', 'jwks.json')}")
          JSON.parse(response.body)
        end
    end

    def auth0_domain
      Rails.application.secrets.auth0_domain
    end

    def auth0_client_id
      Rails.application.secrets.auth0_client_id
    end
  end
end
