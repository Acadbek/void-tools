import { faker } from '@faker-js/faker';

export const DATA_TYPES = [
    // ID & Keys
    { group: 'ID', label: 'UUID', value: 'uuid', fn: () => faker.string.uuid() },
    { group: 'ID', label: 'Mongo ID', value: 'mongoid', fn: () => faker.database.mongodbObjectId() },
    { group: 'ID', label: 'Auto Increment (1,2...)', value: 'auto_increment', fn: (i: number) => i + 1 },

    // Person
    { group: 'Person', label: 'Full Name', value: 'fullName', fn: () => faker.person.fullName() },
    { group: 'Person', label: 'First Name', value: 'firstName', fn: () => faker.person.firstName() },
    { group: 'Person', label: 'Last Name', value: 'lastName', fn: () => faker.person.lastName() },
    { group: 'Person', label: 'Job Title', value: 'jobTitle', fn: () => faker.person.jobTitle() },
    { group: 'Person', label: 'Gender', value: 'gender', fn: () => faker.person.sexType() },

    // Internet
    { group: 'Internet', label: 'Email', value: 'email', fn: () => faker.internet.email() },
    { group: 'Internet', label: 'Username', value: 'username', fn: () => faker.internet.userName() },
    { group: 'Internet', label: 'Password', value: 'password', fn: () => faker.internet.password() },
    { group: 'Internet', label: 'IP Address', value: 'ip', fn: () => faker.internet.ipv4() },
    { group: 'Internet', label: 'Avatar URL', value: 'avatar', fn: () => faker.image.avatar() },

    // Location
    { group: 'Location', label: 'City', value: 'city', fn: () => faker.location.city() },
    { group: 'Location', label: 'Country', value: 'country', fn: () => faker.location.country() },
    { group: 'Location', label: 'Street Address', value: 'street', fn: () => faker.location.streetAddress() },

    // Commerce
    { group: 'Finance', label: 'Price', value: 'price', fn: () => faker.commerce.price() },
    { group: 'Finance', label: 'Product Name', value: 'product', fn: () => faker.commerce.productName() },
    { group: 'Finance', label: 'Credit Card', value: 'creditCard', fn: () => faker.finance.creditCardNumber() },

    // Date
    { group: 'Date', label: 'Past Date', value: 'pastDate', fn: () => faker.date.past().toISOString() },
    { group: 'Date', label: 'Future Date', value: 'futureDate', fn: () => faker.date.future().toISOString() },

    // Content
    { group: 'Content', label: 'Sentence (Lorem)', value: 'sentence', fn: () => faker.lorem.sentence() },
    { group: 'Content', label: 'Paragraph', value: 'paragraph', fn: () => faker.lorem.paragraph() },
    { group: 'Content', label: 'Boolean (true/false)', value: 'boolean', fn: () => faker.datatype.boolean() },
];