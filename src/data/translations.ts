export type Language = 'ka' | 'en' | 'ru' | 'he' | 'ar';

export interface Activity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  adrenaline: number; // 1-5
  metric: string;
  image?: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface PricingPackage {
  title: string;
  price: string;
  features: string[];
  cta: string;
  badge?: string;
}

export interface TranslationDictionary {
  navTitle: string;
  callNow: string;
  bookNow: string;
  heroTagline: string;
  heroSub: string;
  googleReviewStat: string;
  googleRatingText: string;
  adrenalineLabel: string;
  activitiesTitle: string;
  activitiesSub: string;
  interactiveMapTitle: string;
  interactiveMapSub: string;
  mapPrompt: string;
  galleryTitle: string;
  gallerySub: string;
  reviewsTitle: string;
  reviewsSub: string;
  pricingTitle: string;
  pricingSub: string;
  locationTitle: string;
  locationSub: string;
  directionsTitle: string;
  directionsCar: string;
  directionsTaxi: string;
  directionsBus: string;
  workHoursTitle: string;
  workHoursVal: string;
  ctaSectionTitle: string;
  ctaSectionSub: string;
  whatsappCTA: string;
  instagramCTA: string;
  footerRights: string;
  footerLocation: string;
  activities: { [key: string]: Activity };
  reviews: Review[];
  packages: PricingPackage[];
  heroImage?: string;
  galleryImages?: string[];
}

export const translations: Record<Language, TranslationDictionary> = {
  ka: {
    navTitle: 'მაჭახელა',
    callNow: 'დარეკვა (593 65 55 56)',
    bookNow: 'დაჯავშნე ახლავე',
    heroTagline: 'იგრძენი ნამდვილი ადრენალინი მაჭახლის ხეობაში!',
    heroSub: 'ექსტრემალური გართობის უდიდესი ჰაბი ბათუმთან ახლოს. 8 სათავგადასავლო აქტივობა, პროფესიონალური უსაფრთხოების ეკიპირება და სერტიფიცირებული ინსტრუქტორები.',
    googleReviewStat: '4.6 რეიტინგი Google Maps-ზე',
    googleRatingText: '15+ დადებითი შეფასება',
    adrenalineLabel: 'ადრენალინი',
    activitiesTitle: 'სათავგადასავლო ბილიკი',
    activitiesSub: 'გამოცადე შენი შესაძლებლობები ჩვენს 8 ძირითად აქტივობაში. მიჰყევი ბილიკს!',
    interactiveMapTitle: 'ხეობის ინტერაქტიული რუკა',
    interactiveMapSub: 'აირჩიეთ აქტივობა და გადადით სრულ აღწერაზე.',
    mapPrompt: 'აირჩიეთ აქტივობა',
    galleryTitle: 'რეალური ემოციები',
    gallerySub: 'ჩვენი სტუმრების მიერ გადაღებული კადრები მაჭახელადან.',
    reviewsTitle: 'რას ამბობენ სტუმრები',
    reviewsSub: 'რეალური შეფასებები Google-დან და სოციალური ქსელებიდან.',
    pricingTitle: 'სპეციალური პაკეტები',
    pricingSub: 'შეარჩიე შენთვის იდეალური სათავგადასავლო ნაკრები ხელმისაწვდომ ფასად.',
    locationTitle: 'როგორ მოგვაგნოთ',
    locationSub: 'ბათუმიდან სულ რაღაც 30 წუთის სავალზე, ველურ ბუნებასა და მთებში ჩაფლული საოცრება.',
    directionsTitle: 'როგორ ჩამოხვიდეთ',
    directionsCar: 'ავტომობილით: ბათუმიდან იმოძრავეთ ახალციხის მიმართულებით, ხელვაჩაურის გავლით, მაჭახლის ხეობის გადასახვევამდე (კოორდინატები: GPCC+X5).',
    directionsTaxi: 'ტაქსით: ბათუმის ცენტრიდან მგზავრობის დროა ~30 წუთი, ღირებულება დაახლოებით 20-30 ლარი.',
    directionsBus: 'მიკროავტობუსით: ბათუმის ძველი ავტოსადგურიდან გადის ხაზი ბათუმი-მაჭახელა დღეში რამდენჯერმე.',
    workHoursTitle: 'სამუშაო საათები',
    workHoursVal: 'ყოველდღე: 10:00 - 20:00',
    ctaSectionTitle: 'მზად ხარ ახალი თავგადასავლისთვის?',
    ctaSectionSub: 'დაგვიკავშირდი სასურველი არხით და დაჯავშნე ვიზიტი 2 წუთში. ჩვენ გიპასუხებთ მომენტალურად!',
    whatsappCTA: 'მოგვწერე WhatsApp-ში',
    instagramCTA: 'მოგვწერე Instagram-ზე',
    footerRights: 'ყველა უფლება დაცულია. ექსტრემალური გართობის ცენტრი მაჭახელა.',
    footerLocation: 'მისამართი: GPCC+X5, მაჭახლისპირი, აჭარა, საქართველო.',
    activities: {
      zipline: {
        id: 'zipline',
        name: 'ზიპლაინი (Zipline)',
        tagline: 'იფრინე მაჭახლის კანიონის თავზე!',
        description: 'გადაუფრინე მდინარე მაჭახელას 50 მეტრის სიმაღლეზე. ორმაგი ფოლადის ტროსი და უახლესი ამორტიზაციის სისტემა სრულ უსაფრთხოებას იძლევა.',
        adrenaline: 5,
        metric: 'სიგრძე: 450 მეტრი | სიმაღლე: 50მ'
      },
      ropepark: {
        id: 'ropepark',
        name: 'თოკების პარკი',
        tagline: 'გამოსცადე ბალანსი ხეების კენწეროებში.',
        description: 'სხვადასხვა სირთულის დაბრკოლებები, დაკიდებული ხიდები და საჰაერო გადასასვლელები უძველეს ხეებს შორის. საუკეთესოა ოჯახებისთვის.',
        adrenaline: 4,
        metric: '3 სირთულის დონე | 25+ დაბრკოლება'
      },
      climbingwall: {
        id: 'climbingwall',
        name: 'სამაგრი კედელი',
        tagline: 'დალაშქრე ვერტიკალური ქვა.',
        description: '12 მეტრის სიმაღლის ხელოვნური კლდე სხვადასხვა სირთულის ბილიკებით. ავტომატური დამზღვევები (auto-belay) გარანტირებულ უსაფრთხოებას უზრუნველყოფს.',
        adrenaline: 3,
        metric: 'სიმაღლე: 12 მეტრი | 4 საფეხური'
      },
      karting: {
        id: 'karting',
        name: 'კარტინგი მთაში',
        tagline: 'იგრძენი სიჩქარე ველურ ბუნებაში.',
        description: 'რბოლა სპეციალურ ასფალტის ტრასაზე მთებისა და ხეობის ხედებით. მყარი, დაბალცენტრიანი საგზაო კარტები მაქსიმალური ადრენალინისთვის.',
        adrenaline: 4,
        metric: 'ტრასა: 300 მეტრი | 100% ადრენალინი'
      },
      horseriding: {
        id: 'horseriding',
        name: 'ცხენოსნობა',
        tagline: 'ისტორიული ბილიკების შესწავლა.',
        description: 'გასეირნება გაწვრთნილი და მშვიდი ცხენებით მაჭახლის ტყეებსა და ისტორიულ თამარის ქვის ხიდებთან. იდეალურია რელაქსაციისთვის.',
        adrenaline: 2,
        metric: 'ხანგრძლივობა: 1-2 საათი'
      },
      riverboating: {
        id: 'riverboating',
        name: 'ნავით გასეირნება',
        tagline: 'მშვიდი ცურვა კრისტალურ მდინარეზე.',
        description: 'გასეირნება მდინარე მაჭახელაზე სპეციალური ნავებით. დატკბით უნიკალური კანიონების ხედებითა და ხელუხლებელი ბუნებით.',
        adrenaline: 3,
        metric: 'საოჯახო აქტივობა | 30 წთ'
      },
      atvtours: {
        id: 'atvtours',
        name: 'ATV ტურები (კვადროციკლები)',
        tagline: 'ტალახი, მთა და თავისუფლება.',
        description: 'მართე მძლავრი 4x4 კვადროციკლი ველურ ბილიკებზე, ტყის საფარსა და მთის მწვერვალებზე. ტური ტარდება გიდის თანხლებით.',
        adrenaline: 5,
        metric: 'ექსტრემალური ოფროუდი'
      },
      shootingrange: {
        id: 'shootingrange',
        name: 'ტირი (სროლები)',
        tagline: 'გამოცადე შენი სიზუსტე.',
        description: 'სროლა პნევმატური იარაღებით, პისტოლეტებითა და მშვილდ-ისრით ღია ცის ქვეშ. ინსტრუქტორები გასწავლიან მიზანში სწორად მორტყმას.',
        adrenaline: 3,
        metric: 'იარაღები და მშვილდოსნობა'
      }
    },
    reviews: [
      {
        author: 'გიორგი დოლიძე',
        rating: 5,
        text: 'საოცარი ადგილია! ზიპლაინიდან ისეთი ხედები იშლება, გული გაგიჩერდებათ. პერსონალი ძალიან ყურადღებიანია, უსაფრთხოებას 100%-ით იცავენ.',
        date: '1 კვირის წინ'
      },
      {
        author: 'Анна Кузнецова',
        rating: 5,
        text: 'Ребята супер профессионалы. Трасса картинга среди гор — это нечто! Обязательно приедем еще раз на ATV квадроциклы.',
        date: '2 კვირის წინ'
      },
      {
        author: 'David Miller',
        rating: 5,
        text: 'The rope park is challenging but very safe. The valley itself is stunningly beautiful, far better than crowded beach attractions in Batumi.',
        date: '1 თვის წინ'
      }
    ],
    packages: [
      {
        title: 'სოლო ადრენალინი',
        price: '80 ₾',
        features: ['ზიპლაინი (ფრენა)', 'მთის კარტინგი (15 წუთი)', 'სამაგრი კედელი (2 ასვლა)', 'უფასო ფოტოები'],
        cta: 'დაჯავშნე სოლო'
      },
      {
        title: 'საოჯახო თავგადასავალი',
        price: '180 ₾',
        badge: 'პოპულარული',
        features: ['თოკების პარკი (ყველასთვის)', 'ცხენოსნობა (1 საათი)', 'ნავით გასეირნება მდინარეზე', 'ინსტრუქტორის მუდმივი მეთვალყურეობა'],
        cta: 'დაჯავშნე საოჯახო'
      },
      {
        title: 'ექსტრემალური მეგა-პაკეტი',
        price: '250 ₾',
        features: ['ATV ოფროუდ ტური (1 საათი)', 'ზიპლაინი', 'კარტინგი (20 წუთი)', 'ტირი (30 ტყვია / მშვილდი)', 'ტრანსფერი ბათუმიდან'],
        cta: 'დაჯავშნე მეგა'
      }
    ]
  },
  en: {
    navTitle: 'Machakhela',
    callNow: 'Call Now (593 65 55 56)',
    bookNow: 'Book Now',
    heroTagline: 'Feel the True Adrenaline in Machakhela Valley!',
    heroSub: 'The ultimate extreme sports hub near Batumi. 8 thrilling adventures, professional safety gear, and certified instructors in an untouched natural paradise.',
    googleReviewStat: '4.6 Rating on Google Maps',
    googleRatingText: '15+ verified reviews',
    adrenalineLabel: 'Adrenaline',
    activitiesTitle: 'Adventure Trail',
    activitiesSub: 'Challenge your limits across our 8 core activities. Follow the canyon trail below!',
    interactiveMapTitle: 'Interactive Valley Map',
    interactiveMapSub: 'Choose an activity below to jump straight to full details.',
    mapPrompt: 'Select an activity',
    galleryTitle: 'Real Emotions',
    gallerySub: 'Moments captured by our visitors in the heart of Machakhela.',
    reviewsTitle: 'What Our Guests Say',
    reviewsSub: 'Real feedback from Google and social media.',
    pricingTitle: 'Adventure Packages',
    pricingSub: 'Select the perfect adventure bundle tailored for your taste at special prices.',
    locationTitle: 'How to Find Us',
    locationSub: 'Just 30 minutes away from Batumi, tucked into wild mountains and rivers.',
    directionsTitle: 'Directions',
    directionsCar: 'By Car: Drive from Batumi towards Akhaltsikhe, through Khelvachauri, until the turn into Machakhela Valley (coordinates: GPCC+X5).',
    directionsTaxi: 'By Taxi: ~30 minutes drive from downtown Batumi, costs about 20-30 GEL.',
    directionsBus: 'By Minibus (Marshrutka): Departs from Batumi Old Bus Station towards Machakhela several times a day.',
    workHoursTitle: 'Working Hours',
    workHoursVal: 'Daily: 10:00 - 20:00',
    ctaSectionTitle: 'Ready for Your Next Adventure?',
    ctaSectionSub: 'Contact us via your preferred channel and book your spot in under 2 minutes. We reply instantly!',
    whatsappCTA: 'Chat on WhatsApp',
    instagramCTA: 'Message on Instagram',
    footerRights: 'All rights reserved. Extreme Sports Hub Machakhela.',
    footerLocation: 'Address: GPCC+X5, Machakhelaspiri, Adjara, Georgia.',
    activities: {
      zipline: {
        id: 'zipline',
        name: 'Zipline Flight',
        tagline: 'Fly above the Machakhela canyon!',
        description: 'Glide over the rushing river at a height of 50 meters. Dual steel cable system and modern braking guarantees absolute safety.',
        adrenaline: 5,
        metric: 'Length: 450m | Height: 50m'
      },
      ropepark: {
        id: 'ropepark',
        name: 'Rope Treetop Park',
        tagline: 'Balance high in the canopy.',
        description: 'Suspended bridges, nets, and mini ziplines high in the forest. Various difficulty levels suitable for families and adventure seekers.',
        adrenaline: 4,
        metric: '3 levels | 25+ obstacles'
      },
      climbingwall: {
        id: 'climbingwall',
        name: 'Climbing Wall',
        tagline: 'Conquer the vertical stone.',
        description: 'A 12-meter outdoor climbing tower with multi-difficulty routes. Equipped with automatic belay systems for single-climber safety.',
        adrenaline: 3,
        metric: 'Height: 12 meters | 4 routes'
      },
      karting: {
        id: 'karting',
        name: 'Mountain Karting',
        tagline: 'Speed through mountain breezes.',
        description: 'Race on an outdoor asphalt track surrounded by scenic peaks. Low-gravity karts designed for maximum cornering adrenaline.',
        adrenaline: 4,
        metric: 'Track: 300 meters | 100% Fun'
      },
      horseriding: {
        id: 'horseriding',
        name: 'Horseback Riding',
        tagline: 'Ride through historic forest trails.',
        description: 'Explore green mountain pathways and medieval stone bridges of Machakhela on well-trained, gentle horses.',
        adrenaline: 2,
        metric: 'Duration: 1-2 hours'
      },
      riverboating: {
        id: 'riverboating',
        name: 'River Boating',
        tagline: 'Glide along crystal-clear currents.',
        description: 'Scenic and relaxing boat tour along the curves of the Machakhela river. Perfect way to experience the canyon views with family.',
        adrenaline: 3,
        metric: 'Family friendly | 30 mins'
      },
      atvtours: {
        id: 'atvtours',
        name: 'ATV Quad Tours',
        tagline: 'Mud, speed, and mountain ridges.',
        description: 'Take control of a powerful 4x4 quad bike. Drive through muddy forest tracks, water crossings, and high mountain viewpoints with our guide.',
        adrenaline: 5,
        metric: 'Extreme Off-Road'
      },
      shootingrange: {
        id: 'shootingrange',
        name: 'Shooting Range & Archery',
        tagline: 'Test your aiming accuracy.',
        description: 'Outdoor shooting practice featuring air rifles, pistols, and archery. Fully supervised by professional range officers.',
        adrenaline: 3,
        metric: 'Airguns & Archery'
      }
    },
    reviews: [
      {
        author: 'George Dolidze',
        rating: 5,
        text: 'Amazing place! The views from the zipline are mind-blowing. The staff is extremely friendly and safety is their absolute top priority.',
        date: '1 week ago'
      },
      {
        author: 'Anna Kuznetsova',
        rating: 5,
        text: 'The team are super professionals. The karting track in the mountains is something else! We will definitely come back for the ATV tour.',
        date: '2 weeks ago'
      },
      {
        author: 'David Miller',
        rating: 5,
        text: 'The rope park is challenging but very safe. The valley itself is stunningly beautiful, far better than crowded beach attractions in Batumi.',
        date: '1 month ago'
      }
    ],
    packages: [
      {
        title: 'Solo Adventure',
        price: '80 GEL',
        features: ['Zipline Flight', 'Mountain Karting (15 min)', 'Climbing Wall (2 climbs)', 'Free Action Photos'],
        cta: 'Book Solo'
      },
      {
        title: 'Family Adventure',
        price: '180 GEL',
        badge: 'Popular',
        features: ['Rope Park (all paths)', 'Horseback Riding (1 hr)', 'River Boating', 'Continuous Instructor Supervision'],
        cta: 'Book Family'
      },
      {
        title: 'Extreme Mega-Package',
        price: '250 GEL',
        features: ['ATV Off-Road Tour (1 hr)', 'Zipline Flight', 'Mountain Karting (20 min)', 'Shooting Range (30 shots / Archery)', 'Transfer from Batumi included'],
        cta: 'Book Mega'
      }
    ]
  },
  ru: {
    navTitle: 'Маджахела',
    callNow: 'Позвонить (593 65 55 56)',
    bookNow: 'Забронировать',
    heroTagline: 'Почувствуйте настоящий адреналин в ущелье Маджахела!',
    heroSub: 'Крупнейший центр экстремального отдыха под Батуми. 8 захватывающих активностей, профессиональное снаряжение и сертифицированные инструкторы в самом сердце дикой природы.',
    googleReviewStat: 'Рейтинг 4.6 в Google Maps',
    googleRatingText: '15+ реальных отзывов',
    adrenalineLabel: 'Адреналин',
    activitiesTitle: 'Тропа Приключений',
    activitiesSub: 'Испытайте свои силы в 8 главных активностях. Следуйте по нашей тропе!',
    interactiveMapTitle: 'Интерактивная Карта Ущелья',
    interactiveMapSub: 'Выберите активность ниже, чтобы перейти к полному описанию.',
    mapPrompt: 'Выберите активность',
    galleryTitle: 'Реальные Эмоции',
    gallerySub: 'Кадры, снятые нашими гостями прямо в Маджахеле.',
    reviewsTitle: 'Отзывы Гостей',
    reviewsSub: 'Реальные мнения посетителей с Google и соцсетей.',
    pricingTitle: 'Пакеты Приключений',
    pricingSub: 'Выберите идеальный набор экстремальных развлечений по специальной цене.',
    locationTitle: 'Как Нас Найти',
    locationSub: 'Всего 30 минут езды от Батуми — оазис среди первозданных гор и рек.',
    directionsTitle: 'Как добраться',
    directionsCar: 'На машине: Из Батуми в сторону Ахалцихе через Хелвачаури до поворота в ущелье Маджахела (координаты: GPCC+X5).',
    directionsTaxi: 'На такси: ~30 минут из центра Батуми, стоимость поездки около 20-30 GEL.',
    directionsBus: 'На маршрутке: С Батумского старого автовокзала в Маджахелу ходит рейс несколько раз в день.',
    workHoursTitle: 'Время работы',
    workHoursVal: 'Ежедневно: 10:00 - 20:00',
    ctaSectionTitle: 'Готовы к новому приключению?',
    ctaSectionSub: 'Свяжитесь с нами удобным способом и забронируйте визит за 2 минуты. Мы отвечаем мгновенно!',
    whatsappCTA: 'Написать в WhatsApp',
    instagramCTA: 'Написать в Instagram',
    footerRights: 'Все права защищены. Центр экстремального отдыха Маджахела.',
    footerLocation: 'Адрес: GPCC+X5, Маджахеласпири, Аджария, Грузия.',
    activities: {
      zipline: {
        id: 'zipline',
        name: 'Зиплайн (Zipline)',
        tagline: 'Полет над каньоном Маджахела!',
        description: 'Пронеситесь над рекой Маджахела на высоте 50 метров со скоростью 60 км/ч. Двойной стальной трос и новейшая тормозная система гарантируют полную безопасность.',
        adrenaline: 5,
        metric: 'Длина: 450м | Высота: 50м'
      },
      ropepark: {
        id: 'ropepark',
        name: 'Веревочный Парк',
        tagline: 'Испытайте баланс в кронах деревьев.',
        description: 'Множество препятствий, подвесные мосты и мини-зиплайны на высоте векового леса. Отлично подходит как взрослым, так и детям.',
        adrenaline: 4,
        metric: '3 уровня сложности | 25+ преград'
      },
      climbingwall: {
        id: 'climbingwall',
        name: 'Скалодром',
        tagline: 'Покорите вертикальную скалу.',
        description: '12-метровая уличная башня для скалолазания с трассами разной сложности. Система автоматической страховки гарантирует полную безопасность.',
        adrenaline: 3,
        metric: 'Высота: 12 метров | 4 трассы'
      },
      karting: {
        id: 'karting',
        name: 'Горный Картинг',
        tagline: 'Скорость на фоне величественных гор.',
        description: 'Гонки по извилистому асфальтовому треку в окружении зеленых вершин. Устойчивые карты с низким центром тяжести для острых ощущений.',
        adrenaline: 4,
        metric: 'Трасса: 300 метров | 100% драйв'
      },
      horseriding: {
        id: 'horseriding',
        name: 'Конные Прогулки',
        tagline: 'Исследуйте древние лесные тропы.',
        description: 'Прогулки на спокойных, обученных лошадях через живописные леса и средневековые каменные мосты времен царицы Тамары.',
        adrenaline: 2,
        metric: 'Продолжительность: 1-2 часа'
      },
      riverboating: {
        id: 'riverboating',
        name: 'Прогулки на Лодке',
        tagline: 'Мягкий сплав по кристальной реке.',
        description: 'Прогулка по реке Маджахела на надувных лодках. Любуйтесь дикой природой и ущельем всей семьей.',
        adrenaline: 3,
        metric: 'Для всей семьи | 30 мин'
      },
      atvtours: {
        id: 'atvtours',
        name: 'Туры на Квадроциклах',
        tagline: 'Грязь, скорость и вершины гор.',
        description: 'Прокатитесь на мощном полноприводном квадроцикле 4x4 по лесному бездорожью, речным бродам и горным хребтам вместе с гидом.',
        adrenaline: 5,
        metric: 'Экстремальный оффроуд'
      },
      shootingrange: {
        id: 'shootingrange',
        name: 'Стрелковый Тир',
        tagline: 'Проверьте свою меткость.',
        description: 'Стрельба из пневматических винтовок, пистолетов и лука под открытым небом. Инструктор научит вас целиться точно в яблочко.',
        adrenaline: 3,
        metric: 'Пневматика и стрельба из лука'
      }
    },
    reviews: [
      {
        author: 'Георгий Долидзе',
        rating: 5,
        text: 'Потрясающее место! Виды с зиплайна просто дух захватывают. Персонал невероятно заботливый, безопасность соблюдена на все 100%.',
        date: '1 неделю назад'
      },
      {
        author: 'Анна Кузнецова',
        rating: 5,
        text: 'Ребята супер профессионалы. Трасса картинга среди гор — это нечто! Обязательно приедем еще раз на ATV квадроциклы.',
        date: '2 недели назад'
      },
      {
        author: 'Дэвид Миллер',
        rating: 5,
        text: 'Веревочный парк сложный, но очень надежный. Само ущелье потрясающе красивое, намного лучше переполненных пляжей Батуми.',
        date: '1 месяц назад'
      }
    ],
    packages: [
      {
        title: 'Соло Адреналин',
        price: '80 GEL',
        features: ['Полет на зиплайне', 'Горный картинг (15 минут)', 'Скалодром (2 подъема)', 'Бесплатные фото на трассе'],
        cta: 'Заказать Соло'
      },
      {
        title: 'Семейное Приключение',
        price: '180 GEL',
        badge: 'Популярно',
        features: ['Веревочный парк (все трассы)', 'Конная прогулка (1 час)', 'Прогулка на лодке по реке', 'Постоянный присмотр инструктора'],
        cta: 'Заказать Семейный'
      },
      {
        title: 'Экстрим Мега-Пакет',
        price: '250 GEL',
        features: ['Тур на квадроциклах (1 час)', 'Полет на зиплайне', 'Горный картинг (20 минут)', 'Стрелковый тир (30 выстрелов / лук)', 'Трансфер из Батуми включен'],
        cta: 'Заказать Мега'
      }
    ]
  },
  he: {
    navTitle: "מאצ'אחלה",
    callNow: "חייג עכשיו (593 65 55 56)",
    bookNow: "הזמן עכשיו",
    heroTagline: "תרגישו אדרנלין אמיתי בעמק מאצ'אחלה!",
    heroSub: "מרכז הספורט האקסטרים הגדול ביותר ליד בטומי. 8 הרפתקאות מרתקות, ציוד בטיחות מקצועי ומדריכים מוסמכים בגן עדן טבעי בתולי.",
    googleReviewStat: "דירוג 4.6 ב-Google Maps",
    googleRatingText: "15+ חוות דעת מאומתות",
    adrenalineLabel: "אדרנלין",
    activitiesTitle: "מסלול ההרפתקאות",
    activitiesSub: "אתגרו את הגבולות שלכם ב-8 הפעילויות המרכזיות שלנו. עקבו אחר מסלול הקניון!",
    interactiveMapTitle: "מפת העמק האינטראקטיבית",
    interactiveMapSub: "בחרו פעילות למטה כדי לעבור ישירות לפרטים המלאים.",
    mapPrompt: "בחרו פעילות",
    galleryTitle: "רגעים אמיתיים",
    gallerySub: "רגעים שנתפסו על ידי המבקרים שלנו בלב מאצ'אחלה.",
    reviewsTitle: "מה האורחים שלנו אומרים",
    reviewsSub: "משובים אמיתיים מגוגל ומהרשתות החברתיות.",
    pricingTitle: "חבילות הרפתקאות",
    pricingSub: "בחרו את חבילת ההרפתקאות המושלמת עבורכם במחירים מיוחדים.",
    locationTitle: "איך למצוא אותנו",
    locationSub: "רק 30 דקות נסיעה מבטומי, חבוי בתוך הרים פראיים ונהרות.",
    directionsTitle: "הוראות הגעה",
    directionsCar: "ברכב: סעו מבטומי לכיוון אחלציחה, דרך חלוואצ'אורי, עד לפנייה לעמק מאצ'אחלה (קואורדינטות: GPCC+X5).",
    directionsTaxi: "במונית: כ-30 דקות נסיעה ממרכז בטומי, עלות של כ-20-30 לארי.",
    directionsBus: "במיניבוס (מרשרוטקה): יוצא מתחנת האוטובוס הישנה של בטומי לכיוון מאצ'אחله מספר פעמים ביום.",
    workHoursTitle: "שעות פעילות",
    workHoursVal: "כל יום: 10:00 - 20:00",
    ctaSectionTitle: "מוכנים להרפתקה הבאה שלכם?",
    ctaSectionSub: "צרו קשר בערוץ המועדף עליכם והזמינו מקום בפחות מ-2 דקות. אנו עונים באופן מיידי!",
    whatsappCTA: "צ'אט בוואטסאפ",
    instagramCTA: "שלחו הודעה באינסטגרם",
    footerRights: "כל הזכויות שמורות. מרכז ספורט אקסטרים מאצ'אחלה.",
    footerLocation: "כתובת: GPCC+X5, מאצ'אחלאספיრი, אג'ריה, גאורגיה.",
    activities: {
      zipline: {
        id: 'zipline',
        name: "אומגה (Zipline)",
        tagline: "טוסו מעל קניון מאצ'אחלה!",
        description: "גלשו מעל הנהר הגועש בגובה 50 מטרים ובמהירות של 60 קמ\"ש. מערכת כבלי פלדה כפולה ובלמים מודרניים מבטיחים בטיחות מוחלטת.",
        adrenaline: 5,
        metric: "אורך: 450 מטר | גובה: 50 מטר"
      },
      ropepark: {
        id: 'ropepark',
        name: "פארק חבלים",
        tagline: "שיווי משקל בצמרות העצים.",
        description: "גשרים תלויים, רשתות ומיני-אומגות בגובה היער. רמות קושי שונות המתאימות למשפחות ולמחפשי הרפתקאות.",
        adrenaline: 4,
        metric: "3 רמות קושי | 25+ מכשולים"
      },
      climbingwall: {
        id: 'climbingwall',
        name: "קיר טיפוס",
        tagline: "כבשו את קיר האבן האנכי.",
        description: "מגדל טיפוס חיצוני בגובה 12 מטרים עם מסלולים בדרגות קושי שונות. מצויד במערכות אבטחה אוטומטיות לבטיחות מירבית.",
        adrenaline: 3,
        metric: "גובה: 12 מטר | 4 מסלולים"
      },
      karting: {
        id: 'karting',
        name: "קארטינג הרים",
        tagline: "מהירות בין רוחות ההרים.",
        description: "מירוץ במסלול אספלט חיצוני המוקף בפסגות נוף מרהיבות. קארטים בעלי מרכז כובד נמוך המיועדים לאדרנלין פניות מירבי.",
        adrenaline: 4,
        metric: "מסלול: 300 מטר | 100% כיף"
      },
      horseriding: {
        id: 'horseriding',
        name: "רכיבה על סוסים",
        tagline: "רכבו בשבילי יער היסטוריים.",
        description: "חקרו נתיבי הרים ירוקים וגשרי אבן מימי הביניים של מאצ'אחלה על סוסים עדינים ומאומנים היטב.",
        adrenaline: 2,
        metric: "משך זמן: 1-2 שעות"
      },
      riverboating: {
        id: 'riverboating',
        name: "שייט בסירה",
        tagline: "גלשו לאורך זרמים צלולים.",
        description: "שייט סירות רגוע ופסטורלי לאורך עיקולי נהרה של מאצ'אחלה. דרך מושלמת לחוות את נופי הקניון עם המשפחה.",
        adrenaline: 3,
        metric: "מתאים למשפחות | 30 דקות"
      },
      atvtours: {
        id: 'atvtours',
        name: "טיולי טרקטורונים (ATV)",
        tagline: "בוץ, מהירות ורכסי הרים.",
        description: "קחו שליטה על טרקטורון 4x4 עוצמתי. סעו בשבילי יער בוציים, מעברי מים ותצפיות הרים גבוהות עם המדריך שלנו.",
        adrenaline: 5,
        metric: "שטח אקסטרים"
      },
      shootingrange: {
        id: 'shootingrange',
        name: "מטווח ירי וקשתות",
        tagline: "בחנו את דיוק הכיוון שלכם.",
        description: "אימון ירי תחת כיפת השמיים הכולל רובי אוויר, אקדחים וקשתות. בפיקוח מלא של קציני מטווח מקצועיים.",
        adrenaline: 3,
        metric: "רובי אוויר וקשתות"
      }
    },
    reviews: [
      {
        author: 'გიორგი დოლიძე',
        rating: 5,
        text: "מקום מדהים! הנופים מהאומגה עוצרי נשימה. הצוות ידידותי ביותר והבטיחות היא בעדיפות עליונה.",
        date: 'לפני שבוע'
      },
      {
        author: 'Анна Кузнецова',
        rating: 5,
        text: "הצוות סופר מקצועי. מסלול הקארטינג בהרים הוא משהו אחר! בהחלט נחזור לטיול הטרקטורונים.",
        date: 'לפני שבועיים'
      },
      {
        author: 'David Miller',
        rating: 5,
        text: "פארק החבלים מאתגר אך בטוח מאוד. העמק עצמו יפהפה באופן מדהים, הרבה יותר טוב מאטרקציות החוף הצפופות בבטומי.",
        date: 'לפני חודש'
      }
    ],
    packages: [
      {
        title: "סולו אדרנלין",
        price: "80 ₪",
        features: ["טיסת אומגה", "קארטינג הרים (15 דק')", "קיר טיפוס (2 טיפוסים)", "תמונות אקשן חינם"],
        cta: "הזמן סולו"
      },
      {
        title: "הרפתקה משפחתית",
        price: "180 ₪",
        badge: "פופולרי",
        features: ["פארק חבלים (כל המסלולים)", "רכיבה על סוסים (שעה)", "שייט בסירה", "פיקוח מדריך רציף"],
        cta: "הזמן משפחתי"
      },
      {
        title: "מגה-חבילת אקסטרים",
        price: "250 ₪",
        features: ["טיול טרקטורונים (שעה)", "טיסת אומגה", "קארטינג הרים (20 דק')", "מטווח ירי (30 כדורים / קשתות)", "כולל העברה מבטומי"],
        cta: "הזמן מגה"
      }
    ]
  },
  ar: {
    navTitle: "ماتشاخيلا",
    callNow: "اتصل الآن (593 65 55 56)",
    bookNow: "احجز الآن",
    heroTagline: "اشعر بالأدرينالين الحقيقي في وادي ماتشاخيلا!",
    heroSub: "أكبر مركز للرياضات الخطيرة بالقرب من باتومي. 8 مغامرات مثيرة، معدات سلامة احترافية، ومرشدون معتمدون في قلب الطبيعة البكر.",
    googleReviewStat: "تقييم 4.6 على خرائط Google",
    googleRatingText: "أكثر من 15 مراجعة مؤكدة",
    adrenalineLabel: "الأدرينالين",
    activitiesTitle: "مسار المغامرة",
    activitiesSub: "تحدَّ حدودك في أنشطتنا الثمانية الرئيسية. اتبع مسار الوادي أدناه!",
    interactiveMapTitle: "خارطة الوادي التفاعلية",
    interactiveMapSub: "اختر نشاطاً أدناه للانتقال مباشرة إلى التفاصيل الكاملة.",
    mapPrompt: "اختر نشاطاً",
    galleryTitle: "مشاعر حقيقية",
    gallerySub: "لحظات التقطها زوارنا في قلب ماتشاخيلا.",
    reviewsTitle: "ماذا يقول ضيوفنا",
    reviewsSub: "آراء حقيقية من جوجل ووسائل التواصل الاجتماعي.",
    pricingTitle: "باقات المغامرة",
    pricingSub: "اختر باقة المغامرة المثالية لك بأسعار خاصة ومميزة.",
    locationTitle: "كيف تجدنا",
    locationSub: "على بعد 30 دقيقة فقط من باتومي، بين الجبال والأنهار البرية الساحرة.",
    directionsTitle: "كيفية الوصول",
    directionsCar: "بالسيارة: خذ الطريق من باتومي باتجاه أخالتسيخي، عبر خيلفاشاوري، حتى مفرق وادي ماتشاخيلا (الإحداثيات: GPCC+X5).",
    directionsTaxi: "بالتاكسي: حوالي 30 دقيقة من وسط باتومي، التكلفة حوالي 20-30 لاري جيل.",
    directionsBus: "بالحافلة الصغيرة (المارشروتكا): تغادر من محطة حافلات باتومي القديمة باتجاه ماتشاخيلا عدة مرات في اليوم.",
    workHoursTitle: "ساعات العمل",
    workHoursVal: "يوميًا: 10:00 - 20:00",
    ctaSectionTitle: "جاهز لمغامرتك القادمة؟",
    ctaSectionSub: "اتصل بنا عبر قناتك المفضلة واحجز مكانك في أقل من دقيقتين. نجيب على الفور!",
    whatsappCTA: "تحدث معنا عبر الواتساب",
    instagramCTA: "راسلنا على الانستغرام",
    footerRights: "جميع الحقوق محفوظة. مركز ماتشاخيلا للرياضات الخطيرة.",
    footerLocation: "العنوان: GPCC+X5، ماتشاخيلاسبيري، أدجارا، جورجيا.",
    activities: {
      zipline: {
        id: 'zipline',
        name: "زيبلاين (Zipline)",
        tagline: "حلق فوق وادي ماتشاخيلا الساحر!",
        description: "انزلق فوق النهر المتدفق على ارتفاع 50 متراً وبسرعة 60 كم/ساعة. نظام كابلات فولاذية مزدوجة ومكابح حديثة تضمن لك الأمان المطلق.",
        adrenaline: 5,
        metric: "الطول: 450 متر | الارتفاع: 50 متر"
      },
      ropepark: {
        id: 'ropepark',
        name: "حديقة الحبال",
        tagline: "التوازن في أعالي الأشجار.",
        description: "جسور معلقة وشباك ومسارات انزلاق صغيرة بين أشجار الغابة القديمة. مستويات صعوبة متعددة تناسب العائلات وعشاق المغامرة.",
        adrenaline: 4,
        metric: "3 مستويات صعوبة | 25+ عقبة"
      },
      climbingwall: {
        id: 'climbingwall',
        name: "جدار التسلق",
        tagline: "اغزُ الصخرة العمودية.",
        description: "برج تسلق خارجي بارتفاع 12 متراً بمسارات متعددة الصعوبة. مجهز بأنظمة تأمين تلقائية لضمان سلامة المتسلق الفردي.",
        adrenaline: 3,
        metric: "الارتفاع: 12 متر | 4 مسارات"
      },
      karting: {
        id: 'karting',
        name: "الكارتينج الجبلي",
        tagline: "السرعة مع نسيم الجبال العليل.",
        description: "تسابق على مضمار أسفلتي خارجي تحيط به قمم الجبال الخلابة. سيارات كارتينج ذات مركز ثقل منخفض مصممة لأقصى درجات الإثارة في المنعطفات.",
        adrenaline: 4,
        metric: "المضمار: 300 متر | 100% متعة"
      },
      horseriding: {
        id: 'horseriding',
        name: "ركوب الخيل",
        tagline: "امشِ عبر مسارات الغابة التاريخية.",
        description: "استكشف الطرق الجبلية الخضراء والجسور الحجرية التاريخية في ماتشاخيلا على خيول هادئة ومدربة جيداً.",
        adrenaline: 2,
        metric: "المدة: 1-2 ساعة"
      },
      riverboating: {
        id: 'riverboating',
        name: "جولة بالقارب",
        tagline: "انزلق مع التيارات النهرية النقية.",
        description: "جولة هادئة وممتعة بالقارب على طول منحنيات نهر ماتشاخيلا. الطريقة المثالية للاستمتاع بمشاهدة الوادي مع العائلة.",
        adrenaline: 3,
        metric: "مناسب للعائلات | 30 دقيقة"
      },
      atvtours: {
        id: 'atvtours',
        name: "جولات الكواد (ATV)",
        tagline: "الطين والسرعة وقمم الجبال.",
        description: "تحكم في دراجة رباعية الدفع 4x4 قوية. قُد عبر مسارات الغابات الموحلة والممرات المائية مع مرشدنا المحترف.",
        adrenaline: 5,
        metric: "تضاريس وعرة قاسية"
      },
      shootingrange: {
        id: 'shootingrange',
        name: "ميدان الرماية والقوس",
        tagline: "اختبر دقة تصويبك.",
        description: "تدريب على الرماية في الهواء الطلق باستخدام بنادق ومسدسات هوائية وقوس ونشاب. تحت إشراف ضباط ميدان محترفين.",
        adrenaline: 3,
        metric: "بنادق هوائية وقوس"
      }
    },
    reviews: [
      {
        author: 'George Dolidze',
        rating: 5,
        text: "مكان مذهل! الإطلالات من الزيبلاين تخطف الأنفاس. الطاقم ودود للغاية والسلامة هي الأولوية القصوى لديهم.",
        date: "قبل أسبوع"
      },
      {
        author: 'Anna Kuznetsova',
        rating: 5,
        text: "فريق العمل محترف جداً. مضمار الكارتينج في الجبال شيء خيالي! سنعود بالتأكيد لتجربة الكواد.",
        date: "قبل أسبوعين"
      },
      {
        author: 'David Miller',
        rating: 5,
        text: "حديقة الحبال مليئة بالتحدي ولكنها آمنة للغاية. الوادي نفسه جميل بشكل مذهل، أفضل بكثير من شواطئ باتومي المزدحمة.",
        date: "قبل شهر"
      }
    ],
    packages: [
      {
        title: "أدرينالين الفردي",
        price: "80 لاري",
        features: ["رحلة زيبلاين", "كارتينج جبلي (15 دقيقة)", "جدار تسلق (مرتين)", "صور مجانية خلال النشاط"],
        cta: "احجز للفرد"
      },
      {
        title: "مغامرة عائلية",
        price: "180 لاري",
        badge: "محبوب",
        features: ["حديقة الحبال (كل المسارات)", "ركوب خيل (ساعة)", "جولة بالقارب النهري", "إشراف مستمر من المرشد"],
        cta: "احجز للعائلة"
      },
      {
        title: "باقة الأكستريم الضخمة",
        price: "250 لاري",
        features: ["جولات الكواد ATV (ساعة)", "رحلة زيبلاين", "كارتينج جبلي (20 دقيقة)", "ميدان الرماية (30 طلقة / قوس)", "تشمل التوصيل من باتومي"],
        cta: "احجز الباقة"
      }
    ]
  }
};
