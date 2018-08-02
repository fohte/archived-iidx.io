# frozen_string_literal: true

class JsonWebToken
  class << self
    def decode(token)
      JWT.decode(
        token, nil,
        true, # Verify the signature of this token
        algorithm: 'RS256',
        iss: auth0_domain,
        verify_iss: true,
        aud: auth0_api_audience,
        verify_aud: true,
      ) do |header|
        jwks_hash[header['kid']]
      end
    end

    def jwks_hash
      Array(jwks_raw).map do |k|
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
          url = File.join(auth0_domain.to_s, '.well-known', 'jwks.json')
          JSON.parse(Faraday.get(url))
        end
    end

    def auth0_domain
      Rails.application.secrets.auth0_domain
    end

    def auth0_api_audience
      Rails.application.secrets.auth0_api_audience
    end
  end
end
