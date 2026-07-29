// Ảnh tham khảo thật, lấy từ các resort/sân golf/quán cafe tại khu vực Sóc Sơn, Hà Nội.
// Thay bằng ảnh chụp thật của homestay/đối tác khi có.

export const IMAGES = {
  heroResort: "https://cdn.xanhsm.com/2025/03/c92d30f4-resort-soc-son-04.jpg",

  rooms: [
    "https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-2.jpg",
    "https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-5.jpg",
  ],

  pool: [
    "https://cdn.xanhsm.com/2025/03/5603add8-resort-soc-son-01.jpg",
    "https://cdn.xanhsm.com/2025/03/64d6466b-resort-soc-son-02.jpg",
  ],

  lobby: [
    "https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-8.jpg",
    "https://cdn.xanhsm.com/2025/03/50bd0efa-resort-soc-son-03.jpg",
  ],

  golf: [
    "https://gabygolf.com/wp-content/uploads/2021/04/san-golf-brg-legend-hill-golf-resort-san-soc-son.jpg",
    "https://nicklausdesign.com/wp-content/uploads/2019/11/2015-08-12_legend-hill-golf-resort-612x306.jpg",
    "https://nicklausdesign.com/wp-content/uploads/2019/11/22-13.jpg",
    "https://nicklausdesign.com/wp-content/uploads/2019/11/8-126.jpg",
    "https://nicklausdesign.com/wp-content/uploads/2019/11/12-71.jpg",
  ],

  cafeBar: [
    "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/478859MRj/anh-mo-ta.png",
    "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/478859pGT/anh-mo-ta.png",
    "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/478859bpU/anh-mo-ta.png",
    "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/478859TVk/anh-mo-ta.png",
  ],

  packages: [
    "https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-6.jpg",
    "https://cdn.xanhsm.com/2025/03/b9ba9c34-resort-soc-son-06.jpg",
    "https://ticotravel.com.vn/wp-content/uploads/2022/12/resort-soc-son-9.jpg",
  ],

  // Ảnh chi tiết cho từng sân golf (trang /golf và /golf/[slug]), theo slug.
  // Ảnh đầu tiên của mỗi mảng dùng làm ảnh bìa ở trang danh sách.
  golfCourses: {
    "kings-island": [
      "https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-dong-mo-brg-king-island-golf-resort-lakeside.jpg",
      "https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-dong-mo-BRG-Kings-Island-Golf-Resort.png",
      "https://elinkgolf.vn/wp-content/uploads/2020/11/brg-kings-island-golf-resort.jpg",
    ],
    "legend-hill": [
      "https://gabygolf.com/wp-content/uploads/2021/04/san-golf-brg-legend-hill-golf-resort-san-soc-son.jpg",
      "https://nicklausdesign.com/wp-content/uploads/2019/11/22-13.jpg",
      "https://nicklausdesign.com/wp-content/uploads/2019/11/8-126.jpg",
      "https://nicklausdesign.com/wp-content/uploads/2019/11/12-71.jpg",
      "https://nicklausdesign.com/wp-content/uploads/2019/11/19-25.jpg",
      "https://nicklausdesign.com/wp-content/uploads/2019/11/4-188.jpg",
    ],
    "sky-lake": [
      "https://ticotravel.com.vn/wp-content/uploads/2022/11/San-golf-Sky-lake-hoa-binh.jpg",
      "https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-1.jpg",
      "https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-2.jpg",
      "https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-4.jpg",
      "https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-5.jpg",
      "https://ticotravel.com.vn/wp-content/uploads/2022/10/San-Golf-Sky-Lake-11.jpg",
    ],
    "asean-onsen": [
      "https://elinkgolf.vn/wp-content/uploads/2020/07/san-golf-asean-resort.jpg",
      "https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-asean-resort-600x399.jpg",
      "https://elinkgolf.vn/wp-content/uploads/2020/11/asean-golf-resort.jpg",
      "https://elinkgolf.vn/wp-content/uploads/2020/11/san-golf-asean-resort.jpg",
    ],
    "van-tri": [
      "https://sangolf.vn/wp-content/uploads/2021/05/motgoc-1286298000.jpg",
      "https://alegolf.com/medias/2018/12/Hinh-anh-San-Golf-Van-Tri-Van-Tri-Golf-Club-Alegolf-3.webp",
      "https://sangolf.vn/wp-content/uploads/2018/01/25.jpg",
      "https://sangolf.vn/wp-content/uploads/2021/05/5a5adb757c11a2bdccda76ecddabed72.jpg",
    ],
  },
} as const;

export type GolfCourseSlug = keyof typeof IMAGES.golfCourses;

export function getGolfCourseImages(slug: string): readonly string[] {
  return IMAGES.golfCourses[slug as GolfCourseSlug] ?? [];
}
