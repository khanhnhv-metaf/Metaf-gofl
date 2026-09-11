-- Optional one-time seed: backfills the golf courses and packages that used to be hardcoded
-- in src/lib/translations.ts, so /golf and the homepage aren't empty before the admin adds
-- real content (photos/videos/copy) from /admin. Run once in the Supabase SQL editor, after
-- schema.sql. Safe to re-run (uses ON CONFLICT on slug to upsert rather than duplicate rows).

insert into public.golf_courses
  (slug, display_order, featured_on_home,
   name_vi, name_kr, location_vi, location_kr,
   distance_vi, distance_kr, distance_from_homestay_vi, distance_from_homestay_kr,
   holes_vi, holes_kr, highlight_vi, highlight_kr,
   text_vi, text_kr, details_vi, details_kr, images)
values
  ('kings-island', 1, true,
   $$BRG Kings Island Golf Resort$$, $$BRG 킹스 아일랜드 골프 리조트$$,
   $$Đồng Mô, Sơn Tây, Hà Nội$$, $$동모, 선떠이, 하노이$$,
   $$~45 phút từ trung tâm Hà Nội$$, $$하노이 시내에서 약 45분$$,
   $$~12 km$$, $$약 12km$$,
   $$36 hố + Kings Course 19 hố$$, $$36홀 + 킹스 코스 19홀$$,
   $$Sân golf 36 hố đầu tiên của Việt Nam$$, $$베트남 최초의 36홀 골프장$$,
   $$Nằm bên hồ Đồng Mô dưới chân núi Sóc Sơn, gồm 3 sân: Lakeside (ven hồ), Mountain View (view núi) và Kings Course do Jack Nicklaus II thiết kế với hố 19 đảo nổi độc đáo.$$,
   $$쏙선 자락 동모 호수 옆에 위치하며, 호수 코스(Lakeside), 산 전망 코스(Mountain View), 잭 니클라우스 2세가 설계한 독특한 섬 그린 19번 홀의 킹스 코스로 구성됩니다.$$,
   ARRAY[
     $$Di chuyển bằng du thuyền qua hồ Đồng Mô để tới clubhouse trên đảo$$,
     $$Sân Mountain View thiết kế bởi Pacific Coast Designs (Úc)$$,
     $$Hố 19 đặc biệt của Kings Course: phát bóng từ trên thác đá tới green trên đảo$$
   ],
   ARRAY[
     $$동모 호수를 가로지르는 보트를 타고 섬 안의 클럽하우스로 이동$$,
     $$마운틴 뷰 코스는 호주 퍼시픽 코스트 디자인이 설계$$,
     $$킹스 코스 19번 홀: 폭포 위 티에서 섬 그린으로 이어지는 독특한 홀$$
   ],
   ARRAY[
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-dong-mo-brg-king-island-golf-resort-lakeside.jpg$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-dong-mo-BRG-Kings-Island-Golf-Resort.png$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/brg-kings-island-golf-resort.jpg$$
   ]),

  ('legend-hill', 2, false,
   $$BRG Legend Hill Golf Resort$$, $$BRG 레전드 힐 골프 리조트$$,
   $$Phù Linh, Sóc Sơn, Hà Nội$$, $$푸린, 쏙선, 하노이$$,
   $$~40 phút từ trung tâm Hà Nội, gần sân bay Nội Bài$$, $$하노이 시내에서 약 40분, 노이바이 공항 인접$$,
   null, null,
   $$18 hố, Par 72$$, $$18홀, 파 72$$,
   $$Sân twin-green đầu tiên tại Việt Nam$$, $$베트남 최초의 트윈 그린 코스$$,
   $$Do Nicklaus Design thực hiện, mỗi hố có 2 green (36 green cho 18 hố) mang lại trải nghiệm mới lạ cho golfer ở mọi trình độ.$$,
   $$니클라우스 디자인이 설계했으며, 홀마다 2개의 그린(18홀에 36개 그린)을 갖춰 모든 실력의 골퍼에게 새로운 경험을 선사합니다.$$,
   ARRAY[
     $$Thiết kế bởi Nicklaus Design, đứng đầu bởi huyền thoại golf Jack Nicklaus$$,
     $$Khái niệm twin-green lần đầu áp dụng tại châu Á$$,
     $$Bao quanh bởi biệt thự nghỉ dưỡng và đường dạo ven hồ$$
   ],
   ARRAY[
     $$골프 전설 잭 니클라우스가 이끄는 니클라우스 디자인이 설계$$,
     $$아시아 최초로 적용된 트윈 그린 콘셉트$$,
     $$고급 리조트 빌라와 호수를 따라 이어지는 산책로로 둘러싸임$$
   ],
   ARRAY[
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/hinh-anh-san-golf-rbg-legend-hill.jpg$$,
     $$https://gabygolf.com/wp-content/uploads/2021/04/san-golf-brg-legend-hill-golf-resort-san-soc-son.jpg$$,
     $$https://nicklausdesign.com/wp-content/uploads/2019/11/22-13.jpg$$
   ]),

  ('sky-lake', 3, true,
   $$Sky Lake Resort & Golf Club$$, $$스카이레이크 리조트 & 골프클럽$$,
   $$Chương Mỹ, Hà Nội$$, $$쯔엉미, 하노이$$,
   $$~1 giờ từ trung tâm Hà Nội$$, $$하노이 시내에서 약 1시간$$,
   $$~28 km$$, $$약 28km$$,
   $$36 hố (Sky Course & Lake Course)$$, $$36홀 (스카이 코스 & 레이크 코스)$$,
   $$Sân golf có chiều dài thuộc hàng lớn nhất Việt Nam$$, $$베트남에서 손꼽히는 대규모 골프장$$,
   $$Nằm bên hồ Văn Sơn với hai sân đạt chuẩn PGA, bao quanh bởi núi đá vôi và mặt hồ rộng lớn, đi kèm resort 5 sao và villa nghỉ dưỡng.$$,
   $$반선 호수 옆에 위치한 PGA 기준의 두 코스로, 석회암 산과 넓은 호수로 둘러싸여 있으며 5성급 리조트와 빌라를 함께 갖추고 있습니다.$$,
   ARRAY[
     $$Hai sân Sky Course và Lake Course đạt chuẩn thi đấu PGA$$,
     $$Hố số 15 của Sky Course mang tên 'Điện Biên Phủ', lấy cảm hứng từ địa hình lịch sử$$,
     $$Đi kèm resort 5 sao, villa và hệ thống nhà hàng cao cấp$$
   ],
   ARRAY[
     $$스카이 코스와 레이크 코스 모두 PGA 대회 기준 충족$$,
     $$스카이 코스 15번 홀은 '디엔비엔푸'라는 이름으로 역사적 지형에서 영감$$,
     $$5성급 리조트, 빌라, 고급 레스토랑을 함께 갖춤$$
   ],
   ARRAY[
     $$https://ticotravel.com.vn/wp-content/uploads/2022/11/San-golf-Sky-lake-hoa-binh.jpg$$,
     $$https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-1.jpg$$,
     $$https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-4.jpg$$,
     $$https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-5.jpg$$,
     $$https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-11.jpg$$
   ]),

  ('asean-onsen', 4, true,
   $$Asean Onsen Golf & Resort$$, $$아세안 온천 골프 & 리조트$$,
   $$Thạch Thất, Hà Nội$$, $$탁텃, 하노이$$,
   $$~40 phút từ trung tâm Hà Nội$$, $$하노이 시내에서 약 40분$$,
   $$~15 km$$, $$약 15km$$,
   $$9 hố (8 Par 3, 1 Par 4)$$, $$9홀 (파3 8개, 파4 1개)$$,
   $$Kết hợp chơi golf và tắm onsen$$, $$골프와 온천을 함께 즐기는 코스$$,
   $$Sân nhỏ gọn nằm giữa vùng núi đá, có hệ thống đèn chiếu sáng chơi golf ban đêm, gắn liền với khu Shiki Onsen & Spa phong cách Nhật Bản.$$,
   $$산악 지형 사이에 자리한 아담한 코스로, 야간 조명 시설을 갖춰 밤에도 라운딩이 가능하며 일본식 시키 온천 & 스파와 연결되어 있습니다.$$,
   ARRAY[
     $$Có thể chơi golf ban đêm nhờ hệ thống đèn chiếu sáng 24/24$$,
     $$Phù hợp luyện short game với các hố Par 3 ngắn, nhiều thử thách$$,
     $$Liền kề khu Shiki Onsen & Spa để thư giãn sau vòng đấu$$
   ],
   ARRAY[
     $$24시간 조명 시설로 야간 라운딩 가능$$,
     $$짧고 도전적인 파3 홀 위주로 숏게임 연습에 적합$$,
     $$라운딩 후 일본식 시키 온천 & 스파에서 휴식$$
   ],
   ARRAY[
     $$https://elinkgolf.vn/wp-content/uploads/2020/07/san-golf-asean-resort.jpg$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-asean-resort-600x399.jpg$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/asean-golf-resort.jpg$$
   ]),

  ('van-tri', 5, false,
   $$Vân Trì Golf Club$$, $$반찌 골프클럽$$,
   $$Kim Nỗ, Đông Anh, Hà Nội$$, $$낌노, 동아인, 하노이$$,
   $$~20 phút từ sân bay Nội Bài$$, $$노이바이 공항에서 약 20분$$,
   null, null,
   $$18 hố, Par 72$$, $$18홀, 파 72$$,
   $$Sân golf tư nhân, chỉ dành cho hội viên$$, $$회원제 프라이빗 골프장$$,
   $$Do Peter Rousseau thiết kế, là một trong những sân golf riêng tư đầu tiên đạt chuẩn quốc tế tại Việt Nam, nổi bật với cảnh quan xanh và hồ nước tự nhiên.$$,
   $$피터 루소가 설계했으며, 베트남에서 국제 기준을 갖춘 최초의 프라이빗 골프장 중 하나로, 푸른 조경과 자연 호수가 인상적입니다.$$,
   ARRAY[
     $$Sân golf tư nhân đầu tiên tại Việt Nam đạt tiêu chuẩn quốc tế$$,
     $$Thiết kế bởi Peter Rousseau, hài hòa với địa hình và hồ nước tự nhiên$$,
     $$Chỉ cách sân bay Nội Bài khoảng 20 phút di chuyển$$
   ],
   ARRAY[
     $$베트남 최초로 국제 기준을 충족한 프라이빗 골프장$$,
     $$피터 루소가 자연 지형과 호수를 살려 설계$$,
     $$노이바이 국제공항에서 차로 약 20분 거리$$
   ],
   ARRAY[
     $$https://sangolf.vn/wp-content/uploads/2021/05/motgoc-1286298000.jpg$$,
     $$https://alegolf.com/medias/2018/12/Hinh-anh-San-Golf-Van-Tri-Van-Tri-Golf-Club-Alegolf-3.webp$$
   ]),

  ('minh-tri', 6, false,
   $$Hanoi Golf Club (Minh Trí)$$, $$하노이 골프 클럽 (민찌)$$,
   $$Xã Minh Trí, huyện Sóc Sơn, Hà Nội$$, $$하노이 쏙선현 민찌사$$,
   $$~40 phút từ trung tâm Hà Nội$$, $$하노이 시내에서 약 40분$$,
   null, null,
   $$27 hố$$, $$27홀$$,
   $$Sân 27 hố duy nhất tại Việt Nam do KTS Nhật Bản thiết kế$$, $$일본인 설계자가 만든 베트남 유일의 27홀 코스$$,
   $$Do kiến trúc sư Susumu Fujitwara (Nhật Bản) thiết kế trên diện tích 108ha, gồm 3 khu: A (địa hình bằng phẳng), B (đồi núi) và C (ven hồ), mang đến trải nghiệm đa dạng cho mọi trình độ.$$,
   $$일본 건축가 스스무 후지와라가 설계했으며, 108헥타르 부지에 평지형 A코스, 산악지형 B코스, 호숫가 C코스로 구성되어 모든 실력의 골퍼에게 다양한 경험을 선사합니다.$$,
   ARRAY[
     $$Sân duy nhất tại Việt Nam có 27 hố theo phong cách Nhật Bản$$,
     $$Mặt cỏ Tipton 328 cao cấp, thường dùng tại các sân golf danh tiếng$$,
     $$Hỗ trợ chơi golf ban đêm bên cạnh golf ban ngày$$
   ],
   ARRAY[
     $$베트남 유일의 일본식 27홀 골프장$$,
     $$명문 골프장에서 사용하는 고급 티프턴 328 잔디$$,
     $$주간 라운딩은 물론 야간 골프도 가능$$
   ],
   ARRAY[
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-minh-tr%C3%AD.jpg$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-gon-minh-tri.jpg$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-minh-tri-ha-noi-golf-club.jpg$$
   ]),

  ('thanh-lanh', 7, false,
   $$Thanh Lanh Valley Golf & Resort$$, $$타인란 밸리 골프 & 리조트$$,
   $$Xã Trung Mỹ, huyện Bình Xuyên, Vĩnh Phúc$$, $$빈푹성 빈쑤옌현 쭝미사$$,
   $$~60 km từ trung tâm Hà Nội$$, $$하노이 시내에서 약 60km$$,
   null, null,
   $$18 hố, hơn 7.000 yards$$, $$18홀, 총 길이 7,000야드 이상$$,
   $$Sân golf trên cao 1.000m dưới chân núi Tam Đảo$$, $$해발 1,000m, 땀다오 산자락의 고원 골프장$$,
   $$Được thiết kế bởi IMG trên diện tích hơn 73ha dưới chân dãy núi Tam Đảo, sân nằm ở độ cao khoảng 1.000m so với mực nước biển nên khí hậu mát mẻ quanh năm, nhiệt độ trung bình 18–25°C.$$,
   $$글로벌 골프장 설계사인 IMG가 73헥타르 부지에 설계했으며, 해발 약 1,000m에 위치해 연중 18~25도의 선선한 기후를 즐길 수 있습니다.$$,
   ARRAY[
     $$Thiết kế bởi IMG, đơn vị thiết kế sân golf danh tiếng toàn cầu$$,
     $$Tổng chiều dài sân hơn 7.000 yards, nhiều hố par 5 thử thách$$,
     $$Khí hậu mát mẻ quanh năm nhờ độ cao 1.000m so với mực nước biển$$
   ],
   ARRAY[
     $$세계적인 골프장 설계사 IMG가 설계$$,
     $$총 길이 7,000야드 이상, 도전적인 파5 홀 다수$$,
     $$해발 1,000m에 위치해 연중 선선한 기후 유지$$
   ],
   ARRAY[
     $$https://golfgroup.com.vn/wp-content/uploads/2021/10/hinh-anh-san-golf-thanh-lanh-2.png$$,
     $$https://golfgroup.com.vn/wp-content/uploads/2021/10/hinh-anh-san-golf-thanh-lanh-3.png$$,
     $$https://golfgroup.com.vn/wp-content/uploads/2021/10/hinh-anh-san-golf-thanh-lanh-4.png$$
   ]),

  ('dai-lai', 8, false,
   $$Đại Lải Golf Club$$, $$다이라이 골프 클럽$$,
   $$Chân núi Ngọc Thanh, huyện Phúc Yên, Vĩnh Phúc$$, $$빈푹성 푹옌현, 응옥타인 산자락$$,
   $$~40 km từ trung tâm Hà Nội$$, $$하노이 시내에서 약 40km$$,
   null, null,
   $$27 hố$$, $$27홀$$,
   $$Sân golf nhiều hồ nước và địa hình đồi uốn lượn$$, $$호수와 굴곡진 언덕 지형이 특징인 골프장$$,
   $$Do Peter Waddell và Linkshape Australia thiết kế, sân tận dụng tối đa địa hình đồi núi tự nhiên với nhiều hồ nước lớn nhỏ xen kẽ, tạo nên các bẫy nước đầy thử thách ngay từ hố đầu tiên.$$,
   $$피터 와델과 링크셰이프 오스트레일리아가 설계했으며, 자연 지형을 살린 굴곡진 언덕과 크고 작은 호수들이 곳곳에 배치되어 첫 홀부터 도전적인 워터해저드를 만나게 됩니다.$$,
   ARRAY[
     $$27 hố thiết kế bởi Peter Waddell (Linkshape Australia)$$,
     $$Nhiều hồ nước lớn nhỏ xen kẽ tạo bẫy nước thử thách$$,
     $$Nằm dưới chân dãy núi Ngọc Thanh, cách trung tâm Hà Nội chưa đầy 40km$$
   ],
   ARRAY[
     $$피터 와델(링크셰이프 오스트레일리아)이 설계한 27홀$$,
     $$크고 작은 호수가 곳곳에 배치되어 도전적인 워터해저드 형성$$,
     $$응옥타인 산자락에 위치, 하노이 시내에서 40km 이내$$
   ],
   ARRAY[
     $$https://sangolf.vn/wp-content/uploads/2020/08/dai-lai-golf-club-01.jpg$$,
     $$https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-dai-lai.jpg$$,
     $$https://golfgroup.com.vn/wp-content/uploads/2021/06/san-golf-dai-lai-thiet-ke.jpg$$
   ])
on conflict (slug) do update set
  display_order = excluded.display_order,
  featured_on_home = excluded.featured_on_home,
  name_vi = excluded.name_vi, name_kr = excluded.name_kr,
  location_vi = excluded.location_vi, location_kr = excluded.location_kr,
  distance_vi = excluded.distance_vi, distance_kr = excluded.distance_kr,
  distance_from_homestay_vi = excluded.distance_from_homestay_vi,
  distance_from_homestay_kr = excluded.distance_from_homestay_kr,
  holes_vi = excluded.holes_vi, holes_kr = excluded.holes_kr,
  highlight_vi = excluded.highlight_vi, highlight_kr = excluded.highlight_kr,
  text_vi = excluded.text_vi, text_kr = excluded.text_kr,
  details_vi = excluded.details_vi, details_kr = excluded.details_kr,
  images = excluded.images,
  updated_at = now();

insert into public.packages
  (slug, display_order, featured, flight_included,
   tag_vi, tag_kr, name_vi, name_kr, text_vi, text_kr,
   includes_vi, includes_kr, image_url)
values
  ('pkg-weekend', 1, false, false,
   $$2 ngày 1 đêm$$, $$1박 2일$$,
   $$Weekend Retreat$$, $$위켄드 리트릿$$,
   $$Nghỉ dưỡng tại Zen Homestay + 1 vòng golf 18 hố tại Đồng Mô + đưa đón sân golf.$$,
   $$젠 홈스테이 숙박 + 동모 골프장 18홀 라운딩 + 골프장 픽업 서비스.$$,
   ARRAY[$$Phòng nghỉ view núi$$, $$1 vòng golf 18 hố$$, $$Đưa đón sân golf$$, $$Hỗ trợ đưa đón sân bay & xe di chuyển$$],
   ARRAY[$$마운틴 뷰 객실$$, $$18홀 라운딩 1회$$, $$골프장 픽업$$, $$공항 픽업 및 차량 지원 서비스$$],
   $$https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-6.jpg$$),

  ('pkg-golf-onsen', 2, true, false,
   $$3 ngày 2 đêm$$, $$2박 3일$$,
   $$Golf & Onsen Escape$$, $$골프 & 온천 에스케이프$$,
   $$Kết hợp 2 vòng golf tại Đồng Mô & Asean Onsen, tắm khoáng nóng, ăn uống trọn gói.$$,
   $$동모 & 아세안 온천 2개 골프장 라운딩과 온천욕, 전 일정 식사가 포함됩니다.$$,
   ARRAY[$$2 vòng golf (2 sân khác nhau)$$, $$Trải nghiệm onsen$$, $$3 bữa ăn/ngày$$, $$Hỗ trợ đưa đón sân bay & xe di chuyển$$],
   ARRAY[$$2개 골프장 라운딩(2회)$$, $$온천 체험$$, $$1일 3식$$, $$공항 픽업 및 차량 지원 서비스$$],
   $$https://cdn.xanhsm.com/2025/03/b9ba9c34-resort-soc-son-06.jpg$$),

  ('pkg-fly-in', 3, false, true,
   $$5 ngày 4 đêm$$, $$4박 5일$$,
   $$Hanoi Fly & Play$$, $$하노이 플라이 & 플레이$$,
   $$Trọn gói vé máy bay khứ hồi, đưa đón sân bay, nghỉ dưỡng và 3 vòng golf tại 3 sân khác nhau.$$,
   $$왕복 항공권, 공항 픽업, 숙박과 3개 골프장 라운딩이 포함된 올인클루시브 패키지입니다.$$,
   ARRAY[$$Vé máy bay khứ hồi$$, $$3 vòng golf (Đồng Mô, Asean Onsen, Sky Lake)$$, $$Đưa đón sân bay & sân golf$$],
   ARRAY[$$왕복 항공권$$, $$3개 골프장 라운딩(동모, 아세안 온천, 스카이레이크)$$, $$공항 및 골프장 픽업$$],
   $$https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-9.jpg$$)
on conflict (slug) do update set
  display_order = excluded.display_order,
  featured = excluded.featured,
  flight_included = excluded.flight_included,
  tag_vi = excluded.tag_vi, tag_kr = excluded.tag_kr,
  name_vi = excluded.name_vi, name_kr = excluded.name_kr,
  text_vi = excluded.text_vi, text_kr = excluded.text_kr,
  includes_vi = excluded.includes_vi, includes_kr = excluded.includes_kr,
  image_url = excluded.image_url,
  updated_at = now();
