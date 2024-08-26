import Review from './Review';

export interface Workshop {
    id: number;
    title: string;
    imageUrl: string; // immagine principale
    favourite: boolean;
    position: string;
    reviews: Review[];
    freeCancellation: boolean;
    price: string;
    discount: number;
    freeService: string;
    verified: boolean;
    services: string[];
    images: string[]; // array di immagini
}

const workshops: Workshop[] = [
    {
        id: 5,
        title: 'Golden Gate Auto Repair',
        imageUrl: 'https://prodiags.com/wp-content/uploads/2021/01/Korjaamopaallikko_Tyontekijat_1000X341.jpg',
        favourite: true,
        position: 'San Francisco, USA',
        reviews: [
            {
                stars: 5,
                text: 'Top-notch service! My car runs smoothly now.',
                authorName: 'Linda Grey',
                authorImageUrl: 'https://example.com/lindagrey.jpg',
                when: new Date('2023-08-20'),
            },
            {
                stars: 4,
                text: 'Great experience, but had to wait a bit longer than expected.',
                authorName: 'Tom Brown',
                authorImageUrl: 'https://example.com/tombrown.jpg',
                when: new Date('2023-08-10'),
            },
        ],
        freeCancellation: true,
        price: '$180',
        discount: 20,
        freeService: 'Free oil change',
        verified: true,
        services: ['oil change', 'vehicle inspection', 'tires'],
        images: [
            'https://example.com/car-repair-1.jpg',
            'https://example.com/car-repair-2.jpg',
            'https://example.com/car-repair-3.jpg'
        ],
    },
    {
        id: 6,
        title: 'Seattle Tire and Auto',
        imageUrl: 'https://premier-carcare.com/wp-content/uploads/2019/02/auto-repair-shop-man.jpg',
        favourite: false,
        position: 'Seattle, USA',
        reviews: [
            {
                stars: 4,
                text: 'Tires were replaced quickly, and the alignment is perfect!',
                authorName: 'Patricia Blue',
                authorImageUrl: 'https://example.com/patriciablue.jpg',
                when: new Date('2023-07-22'),
            },
            {
                stars: 3,
                text: 'Good service but communication could be better.',
                authorName: 'Henry Gold',
                authorImageUrl: 'https://example.com/henrygold.jpg',
                when: new Date('2023-06-17'),
            },
        ],
        freeCancellation: false,
        price: '$140',
        discount: 10,
        freeService: 'Free tire balancing',
        verified: false,
        services: ['tires', 'battery'],
        images: [
            'https://example.com/auto-shop-1.jpg',
            'https://example.com/auto-shop-2.jpg'
        ],
    },
    {
        id: 7,
        title: 'Dallas Brake Experts',
        imageUrl: 'https://media.istockphoto.com/id/1175888628/photo/woman-repairing-a-car-in-auto-repair-shop.jpg?s=612x612&w=0&k=20&c=nAR4nGKji8YAlaoRCxWIrmJvSd1-qDEW2ZYTGWvkG0M=',
        favourite: false,
        position: 'Dallas, USA',
        reviews: [
            {
                stars: 5,
                text: 'Best brake service I’ve ever had!',
                authorName: 'Nicole White',
                authorImageUrl: 'https://example.com/nicolewhite.jpg',
                when: new Date('2023-08-05'),
            },
            {
                stars: 4,
                text: 'Good value for the price, brakes feel great now.',
                authorName: 'George Black',
                authorImageUrl: 'https://example.com/georgeblack.jpg',
                when: new Date('2023-07-30'),
            },
        ],
        freeCancellation: true,
        price: '$160',
        discount: 5,
        freeService: 'Free brake inspection',
        verified: true,
        services: ['vehicle inspection', 'tires', 'service'],
        images: [
            'https://example.com/brake-repair-1.jpg',
            'https://example.com/brake-repair-2.jpg',
        ],
    },
    {
        id: 8,
        title: 'Austin Auto Diagnostics',
        imageUrl: 'https://www.shutterstock.com/image-photo/tablet-hands-auto-mechanic-working-600nw-2353734775.jpg',
        favourite: false,
        position: 'Austin, USA',
        reviews: [
            {
                stars: 3,
                text: 'Average service. The issue wasn’t fully resolved.',
                authorName: 'Olivia Green',
                authorImageUrl: 'https://example.com/oliviagreen.jpg',
                when: new Date('2023-05-20'),
            },
            {
                stars: 2,
                text: 'The diagnostics took too long, and I wasn’t fully satisfied.',
                authorName: 'Daniel Red',
                authorImageUrl: 'https://example.com/danielred.jpg',
                when: new Date('2023-04-14'),
            },
        ],
        freeCancellation: false,
        price: '$90',
        discount: 0,
        freeService: 'Free engine light check',
        verified: false,
        services: ['oil change', 'battery'],
        images: [
            'https://example.com/diagnostics-1.jpg',
            'https://example.com/diagnostics-2.jpg',
        ],
    },
    {
        id: 9,
        title: 'Vegas Body and Paint',
        imageUrl: 'https://media.istockphoto.com/id/1700728929/photo/mechanic-fixing-a-broken-car-using-a-scanner.webp?b=1&s=612x612&w=0&k=20&c=DfcSsUzXwEoBwQaxQJfoPFEwkW3PRZ2Sc96zNPq82pc=',
        favourite: true,
        position: 'Las Vegas, USA',
        reviews: [
            {
                stars: 5,
                text: 'Amazing job! My car looks brand new.',
                authorName: 'Sophia Violet',
                authorImageUrl: 'https://example.com/sophiaviolet.jpg',
                when: new Date('2023-09-01'),
            },
            {
                stars: 5,
                text: 'The paint job was flawless. Highly recommend!',
                authorName: 'James Silver',
                authorImageUrl: 'https://example.com/jamessilver.jpg',
                when: new Date('2023-08-28'),
            },
        ],
        freeCancellation: true,
        price: '$220',
        discount: 25,
        freeService: 'Free car wash with repair',
        verified: true,
        services: ['vehicle inspection', 'service', 'battery'],
        images: [
            'https://example.com/paint-shop-1.jpg',
            'https://example.com/paint-shop-2.jpg',
        ],
    },
    {
        id: 10,
        title: 'Orlando AC Repairs',
        imageUrl: 'https://t4.ftcdn.net/jpg/07/59/14/47/360_F_759144792_MwrKuYtnrz1wQ7j6lV9C5tqSr9VnwhJX.jpg',
        favourite: false,
        position: 'Orlando, USA',
        reviews: [
            {
                stars: 4,
                text: 'Great service, but it took a while to get my car back.',
                authorName: 'Megan Orange',
                authorImageUrl: 'https://example.com/meganorange.jpg',
                when: new Date('2023-07-12'),
            },
            {
                stars: 3,
                text: 'Air conditioning works now, but the price was a bit steep.',
                authorName: 'Lucas Blue',
                authorImageUrl: 'https://example.com/lucasblue.jpg',
                when: new Date('2023-06-05'),
            },
        ],
        freeCancellation: false,
        price: '$130',
        discount: 10,
        freeService: 'Free AC system check',
        verified: false,
        services: ['air conditioning', 'vehicle inspection', 'service'],
        images: [
            'https://example.com/ac-repair-1.jpg',
            'https://example.com/ac-repair-2.jpg',
        ],
    },
];

export default workshops;
