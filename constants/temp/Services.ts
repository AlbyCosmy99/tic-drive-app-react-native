export interface Review {
    stars: number,
    text: string,
    authorName: string,
    authorImageUrl: string,
    when: Date
}

export interface Service {
    id: number,
    title: string,
    imageUrl: string,
    favourite: boolean,
    position: string,
    reviews: Review[],
    freeCancellation: boolean,
    price: string,
    discount: number,
    freeService: string
    //stars: number
}

const services: Service[] = [
    {
        id: 5,
        title: 'Full Car Maintenance Package',
        imageUrl: 'https://example.com/carservice5.jpg',
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
        freeService: 'Free oil change'
    },
    {
        id: 6,
        title: 'Tire Replacement and Alignment',
        imageUrl: 'https://example.com/carservice6.jpg',
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
        freeService: 'Free tire balancing'
    },
    {
        id: 7,
        title: 'Brake Replacement Package',
        imageUrl: 'https://example.com/carservice7.jpg',
        favourite: true,
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
        freeService: 'Free brake inspection'
    },
    {
        id: 8,
        title: 'Engine Diagnostics and Tune-Up',
        imageUrl: 'https://example.com/carservice8.jpg',
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
        freeService: 'Free engine light check'
    },
    {
        id: 9,
        title: 'Full Body Repair and Paint',
        imageUrl: 'https://example.com/carservice9.jpg',
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
        freeService: 'Free car wash with repair'
    },
    {
        id: 10,
        title: 'Air Conditioning Repair',
        imageUrl: 'https://example.com/carservice10.jpg',
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
        freeService: 'Free AC system check'
    },
];

export default services;
