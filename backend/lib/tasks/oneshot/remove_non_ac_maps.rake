# frozen_string_literal: true

namespace :oneshot do
  task remove_non_ac_maps: :environment do
    gambol = Music.find_by(title: 'GAMBOL')
    gambol.sp_another.destroy
    gambol.dp_another.destroy

    Music.find_by(title: 'Hitch Hiker2').dp_another.destroy
    Music.find_by(title: '電人イェーガーのテーマ(Theme of DENJIN J)').sp_another.destroy
  end
end
