# frozen_string_literal: true

module Textage
  module Pages
    class Score
      BPM_SEPARATOR = '〜'

      # @param html [String]
      def initialize(html)
        @js_source = fetch_inner_javascript(html)
        @js = JavaScriptParser.new(prepared_definition_source, @js_source)
      end

      # @return [String]
      def genre
        @js.fetch_variable!(:genre).to_s
      end

      # @return [String]
      def artist
        @js.fetch_variable!(:artist).to_s
      end

      # @return [String]
      def title
        @js.fetch_variable!(:title).to_s
      end

      def bpm
        bpm_str = @js.fetch_variable(:bpm)

        return (0..0) if bpm_str.nil?

        if bpm_str.include?(BPM_SEPARATOR)
          start_bpm, end_bpm = bpm_str.split(BPM_SEPARATOR).map(&:to_i)
          start_bpm..end_bpm
        else
          bpm = bpm_str.to_i
          bpm..bpm
        end
      end

      def bms(play_style:, difficulty:)
        @bms ||= {}
        @bms[[play_style, difficulty]] ||= BMS.new(
          prepared_definition_source,
          @js_source,
          play_style: play_style,
          difficulty: difficulty,
        )
      end

      private

      def prepared_definition_source
        <<~JS
          b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          LNDEF=384,cob=["s","w","b","w","b","w","b","w"];
          obr=[[0,1,2,3,4,5,6,7],[0,1,2,3,4,5,6,7]];kc=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
          dpalls=[[0,1,2,3,4,5,6,7],[0,7,6,5,4,3,2,1]];imgdir="../";diftype="";twstr="";
          ln=[],sp=[],dp=[],tc=[],c1=[],c2=[],cn=[],sides=["",2,2],csd=["","left","right"];
          dw=[134,121],dr=[38,4],df=[134,119],ms=["",""," class=m1"," class=m2"];tm=new Date();hsa=8;
          genre=title=artist=bpm=opt=lnse=lnhs="",key=ky=back=7,hs=gap=ty=k=1;cncnt=bsscnt=legacy=prt=pty=0;
          soflan=level=notes=measure=a=l=m=g=db=p1o=hps=flp=off=lnln=lnst=lned=alls=sran=kuro=sftkey=os=hcn=ttl=0;
          sc32=[],sc32base=[],sc32loop=[];
          hd = () => {};
          w = () => {};
          b = () => {};
          ft = () => {};
          im = () => {};
        JS
      end

      # @param [html]
      # @return [String]
      def fetch_inner_javascript(html)
        dom = Nokogiri::HTML(html)
        dom.css('script:not([src])').first
      end
    end
  end
end
