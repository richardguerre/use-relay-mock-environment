const Fuse = require('fuse.js');
const fakerTypes = [
  {
    type: 'faker.random.arrayElement',
    keywords: ['random', 'arrayElement', 'random arrayElement'],
  },
  {
    type: 'faker.random.arrayElements',
    keywords: ['random', 'arrayElements', 'random arrayElements'],
  },
  {
    type: 'faker.random.objectElement',
    keywords: ['random', 'objectElement', 'random objectElement'],
  },
  {
    type: 'faker.random.alpha',
    keywords: ['random', 'alpha', 'random alpha'],
  },
  {
    type: 'faker.random.alphaNumeric',
    keywords: ['random', 'alphaNumeric', 'random alphaNumeric'],
  },
  {
    type: 'faker.name.firstName',
    keywords: ['firstName', 'given name', 'forename', 'name firstName'],
  },
  {
    type: 'faker.name.lastName',
    keywords: [
      'lastName',
      'family name',
      'sirname',
      'surname',
      'maiden name',
      'paternal name',
      'maternal name',
      'byname',
      'name lastName',
    ],
  },
  {
    type: 'faker.name.middleName',
    keywords: [
      'middleName',
      'given middle name',
      'second name',
      'name middleName',
    ],
  },
  {
    type: 'faker.name.findName',
    keywords: ['fullName', 'name', 'findName', 'name findName'],
  },
  {
    type: 'faker.name.jobTitle',
    keywords: ['name', 'jobTitle', 'name jobTitle'],
  },
  {
    type: 'faker.name.gender',
    keywords: ['name', 'gender', 'name gender'],
  },
  {
    type: 'faker.name.prefix',
    keywords: ['name', 'prefix', 'name prefix'],
  },
  {
    type: 'faker.name.suffix',
    keywords: ['name', 'suffix', 'name suffix'],
  },
  {
    type: 'faker.name.title',
    keywords: ['name', 'title', 'name title'],
  },
  {
    type: 'faker.name.jobDescriptor',
    keywords: [
      'name',
      'jobDescriptor',
      'jobRole',
      'name jobDescriptor',
      'name jobRole',
      'company role',
    ],
  },
  {
    type: 'faker.name.jobArea',
    keywords: [
      'name',
      'jobArea',
      'name jobArea',
      'job department',
      'company area',
      'company department',
    ],
  },
  {
    type: 'faker.name.jobType',
    keywords: [
      'name',
      'jobType',
      'name jobType',
      'job role',
      'job role type',
      'company role type',
      'company job role',
    ],
  },
  {
    type: 'faker.address.zipCode',
    keywords: ['address', 'zipCode', 'address zipCode'],
  },
  {
    type: 'faker.address.zipCodeByState',
    keywords: [
      'address',
      'zipCodeByState',
      'address zipCodeByState',
      'postal code',
    ],
  },
  {
    type: 'faker.address.city',
    keywords: ['address', 'city', 'address city', 'metropolitan'],
  },
  {
    type: 'faker.address.cityPrefix',
    keywords: ['address', 'cityPrefix', 'address cityPrefix'],
  },
  {
    type: 'faker.address.citySuffix',
    keywords: ['address', 'citySuffix', 'address citySuffix'],
  },
  {
    type: 'faker.address.cityName',
    keywords: ['address', 'cityName', 'address cityName'],
  },
  {
    type: 'faker.address.streetName',
    keywords: ['address', 'streetName', 'address streetName'],
  },
  {
    type: 'faker.address.streetAddress',
    keywords: ['address', 'streetAddress', 'address streetAddress'],
  },
  {
    type: 'faker.address.streetSuffix',
    keywords: ['address', 'streetSuffix', 'address streetSuffix'],
  },
  {
    type: 'faker.address.streetPrefix',
    keywords: ['address', 'streetPrefix', 'address streetPrefix'],
  },
  {
    type: 'faker.address.secondaryAddress',
    keywords: ['address', 'secondaryAddress', 'address secondaryAddress'],
  },
  {
    type: 'faker.address.county',
    keywords: ['address', 'county', 'address county', 'district'],
  },
  {
    type: 'faker.address.country',
    keywords: ['address', 'country', 'address country'],
  },
  {
    type: 'faker.address.countryCode',
    keywords: ['address', 'countryCode', 'address countryCode'],
  },
  {
    type: 'faker.address.state',
    keywords: ['address', 'state', 'address state', 'region'],
  },
  {
    type: 'faker.address.stateAbbr',
    keywords: [
      'address',
      'stateAbbr',
      'address stateAbbr',
      'state abbreviation',
    ],
  },
  {
    type: 'faker.address.latitude',
    keywords: ['address', 'latitude', 'address latitude'],
  },
  {
    type: 'faker.address.longitude',
    keywords: ['address', 'longitude', 'address longitude'],
  },
  {
    type: 'faker.address.direction',
    keywords: ['address', 'direction', 'address direction'],
  },
  {
    type: 'faker.address.cardinalDirection',
    keywords: ['address', 'cardinalDirection', 'address cardinalDirection'],
  },
  {
    type: 'faker.address.ordinalDirection',
    keywords: ['address', 'ordinalDirection', 'address ordinalDirection'],
  },
  {
    type: 'faker.address.nearbyGPSCoordinate',
    keywords: [
      'address',
      'nearbyGPSCoordinate',
      'address nearbyGPSCoordinate',
      'GPS coordinates',
    ],
  },
  {
    type: 'faker.address.timeZone',
    keywords: [
      'timezone area',
      'time area',
      'address',
      'timeZone',
      'address timeZone',
    ],
  },
  {
    type: 'faker.animal.type',
    keywords: ['animal', 'type', 'animal type'],
  },
  {
    type: 'faker.company.companyName',
    keywords: ['company', 'companyName', 'company companyName'],
  },
  {
    type: 'faker.company.companySuffix',
    keywords: ['company', 'companySuffix', 'company companySuffix'],
  },
  {
    type: 'faker.company.catchPhrase',
    keywords: ['company', 'catchPhrase', 'company catchPhrase', 'slogan'],
  },
  {
    type: 'faker.company.bs',
    keywords: [
      'company',
      'company bs',
      'client bs',
      'company heresay',
      'client heresay',
      'companyDescription',
      'clientDescription',
    ],
  },
  {
    type: 'faker.company.catchPhraseAdjective',
    keywords: [
      'company',
      'catchPhraseAdjective',
      'company catchPhraseAdjective',
      'client catchPhraseAdjective',
    ],
  },
  {
    type: 'faker.company.catchPhraseDescriptor',
    keywords: [
      'company',
      'catchPhraseDescriptor',
      'company catchPhraseDescriptor',
    ],
  },
  {
    type: 'faker.company.catchPhraseNoun',
    keywords: ['company', 'catchPhraseNoun', 'company catchPhraseNoun'],
  },
  {
    type: 'faker.company.bsAdjective',
    keywords: ['company', 'bsAdjective', 'company bsAdjective'],
  },
  {
    type: 'faker.company.bsBuzz',
    keywords: [
      'company',
      'bsBuzz',
      'buzzword',
      'company buzzword',
      'company bsBuzz',
    ],
  },
  {
    type: 'faker.company.bsNoun',
    keywords: ['company', 'bsNoun', 'bsword', 'company bsNoun'],
  },
  {
    type: 'faker.finance.account',
    keywords: [
      'finance',
      'account',
      'account number',
      'account id',
      'finance account',
    ],
  },
  {
    type: 'faker.finance.accountName',
    keywords: ['finance', 'accountName', 'accountTitle', 'finance accountName'],
  },
  {
    type: 'faker.finance.routingNumber',
    keywords: ['finance', 'routingNumber', 'finance routingNumber'],
  },
  {
    type: 'faker.finance.mask',
    keywords: ['finance', 'mask', 'money mask', 'finance mask'],
  },
  {
    type: 'faker.finance.amount',
    keywords: [
      'finance',
      'amount',
      'finance amount',
      'cost',
      'costin',
      'dollar',
      'costInDollars',
      'costInUSD',
      'USD',
      'money',
    ],
  },
  {
    type: 'faker.finance.transactionType',
    keywords: ['finance', 'transactionType', 'finance transactionType'],
  },
  {
    type: 'faker.finance.currencyCode',
    keywords: ['finance', 'currencyCode', 'finance currencyCode'],
  },
  {
    type: 'faker.finance.currencyName',
    keywords: ['finance', 'currencyName', 'finance currencyName'],
  },
  {
    type: 'faker.finance.currencySymbol',
    keywords: ['finance', 'currencySymbol', 'finance currencySymbol'],
  },
  {
    type: 'faker.finance.bitcoinAddress',
    keywords: ['finance', 'finance bitcoinAddress'],
  },
  {
    type: 'faker.finance.litecoinAddress',
    keywords: ['finance', 'finance litecoinAddress'],
  },
  {
    type: 'faker.finance.creditCardNumber',
    keywords: ['finance', 'creditCardNumber', 'finance creditCardNumber'],
  },
  {
    type: 'faker.finance.creditCardCVV',
    keywords: [
      'finance',
      'creditCardCVV',
      'finance creditCardCVV',
      'credit card code',
    ],
  },
  {
    type: 'faker.finance.ethereumAddress',
    keywords: ['finance', 'finance ethereumAddress'],
  },
  {
    type: 'faker.finance.iban',
    keywords: [
      'finance',
      'iban',
      'finance iban',
      'iban number',
      'iban reference',
      'iban ref',
    ],
  },
  {
    type: 'faker.finance.bic',
    keywords: [
      'finance',
      'bic',
      'finance bic',
      'bic number',
      'bic ref',
      'bic reference',
    ],
  },
  {
    type: 'faker.finance.transactionDescription',
    keywords: [
      'finance',
      'transactionDescription',
      'finance transactionDescription',
      'transaction reason',
    ],
  },
  {
    type: 'faker.image.avatar',
    keywords: [
      'avatarUrl',
      'profile',
      'profile image',
      'profileUrl',
      'image',
      'avatar',
      'image avatar',
    ],
  },
  {
    type: 'faker.image.imageUrl',
    keywords: [
      'image',
      'imageUrl',
      'image imageUrl',
      'random',
      'random image',
      'imageUrl',
      'picture',
      'photo',
      'pictureUrl',
      'photoUrl',
      'landscape',
      'attachement',
      'Url',
    ],
  },
  {
    type: 'faker.image.dataUri',
    keywords: ['dataUri', 'image dataUri'],
  },
  {
    type: 'faker.lorem.word',
    keywords: [
      'lorem',
      'word',
      'lorem word',
      'word',
      'random word',
      'one',
      'really short comment',
      'really short description',
      'reaction',
    ],
  },
  {
    type: 'faker.lorem.words',
    keywords: [
      'lorem',
      'words',
      'lorem words',
      'words',
      'random words',
      'really short comment',
      'really short description',
    ],
  },
  {
    type: 'faker.lorem.sentence',
    keywords: [
      'lorem',
      'sentence',
      'lorem sentence',
      'comment',
      'short description',
    ],
  },
  {
    type: 'faker.lorem.slug',
    keywords: ['lorem', 'slug', 'lorem slug'],
  },
  {
    type: 'faker.lorem.sentences',
    keywords: [
      'lorem',
      'sentences',
      'lorem sentences',
      'long comment',
      'short description',
    ],
  },
  {
    type: 'faker.lorem.paragraph',
    keywords: [
      'lorem',
      'paragraph',
      'lorem paragraph',
      'description',
      'text',
      'body',
    ],
  },
  {
    type: 'faker.lorem.paragraphs',
    keywords: [
      'lorem',
      'paragraphs',
      'lorem paragraphs',
      'long description',
      'long body',
    ],
  },
  {
    type: 'faker.lorem.text',
    keywords: ['lorem', 'text', 'lorem text'],
  },
  {
    type: 'faker.lorem.lines',
    keywords: ['lorem', 'lines', 'lorem lines'],
  },
  {
    type: 'faker.hacker.abbreviation',
    keywords: [
      'hacker',
      'abbreviation',
      'hacker abbreviation',
      'technology abbrevation',
    ],
  },
  {
    type: 'faker.hacker.adjective',
    keywords: [
      'hacker',
      'adjective',
      'hacker adjective',
      'consumer technology',
    ],
  },
  {
    type: 'faker.hacker.noun',
    keywords: ['hacker', 'noun', 'hacker noun', 'technology word'],
  },
  {
    type: 'faker.hacker.verb',
    keywords: ['hacker', 'verb', 'hacker verb', 'technology verb'],
  },
  {
    type: 'faker.hacker.ingverb',
    keywords: ['hacker', 'ingverb', 'hacker ingverb', 'action'],
  },
  {
    type: 'faker.hacker.phrase',
    keywords: ['hacker', 'phrase', 'hacker phrase'],
  },
  {
    type: 'faker.internet.email',
    keywords: ['internet', 'email', 'internet email'],
  },
  {
    type: 'faker.internet.userName',
    keywords: [
      'internet',
      'userName',
      'internet userName',
      'profile',
      'handle',
      'login',
      'userlogin',
      'profile handle',
    ],
  },
  {
    type: 'faker.internet.protocol',
    keywords: ['internet', 'protocol', 'internet protocol'],
  },
  {
    type: 'faker.internet.httpMethod',
    keywords: ['internet', 'httpMethod', 'internet httpMethod'],
  },
  {
    type: 'faker.internet.url',
    keywords: [
      'internet',
      'url',
      'internet url',
      'link',
      'contentUrl',
      'source',
      'sourceUrl',
    ],
  },
  {
    type: 'faker.internet.domainName',
    keywords: ['internet', 'domainName', 'internet domainName'],
  },
  {
    type: 'faker.internet.domainSuffix',
    keywords: ['internet', 'domainSuffix', 'internet domainSuffix'],
  },
  {
    type: 'faker.internet.domainWord',
    keywords: ['internet', 'domainWord', 'internet domainWord'],
  },
  {
    type: 'faker.internet.ip',
    keywords: ['internet', 'ip', 'internet ip'],
  },
  {
    type: 'faker.internet.ipv6',
    keywords: ['internet', 'ipv6', 'internet ipv6'],
  },
  {
    type: 'faker.internet.port',
    keywords: ['internet', 'port', 'internet port'],
  },
  {
    type: 'faker.internet.userAgent',
    keywords: ['internet', 'userAgent', 'internet userAgent'],
  },
  {
    type: 'faker.internet.color',
    keywords: [
      'internet',
      'color',
      'internet color',
      'background color',
      'html color',
      'hex color',
    ],
  },
  {
    type: 'faker.internet.mac',
    keywords: ['mac address', 'internet', 'mac', 'internet mac'],
  },
  {
    type: 'faker.internet.password',
    keywords: ['internet', 'password', 'internet password'],
  },
  {
    type: 'faker.database.column',
    keywords: ['database', 'column', 'database column'],
  },
  {
    type: 'faker.database.type',
    keywords: ['database', 'type', 'database type', 'db type'],
  },
  {
    type: 'faker.database.collation',
    keywords: ['database', 'collation', 'database collation', 'db collation'],
  },
  {
    type: 'faker.database.engine',
    keywords: ['database', 'engine', 'database engine', 'db engine'],
  },
  {
    type: 'faker.phone.phoneNumber',
    keywords: ['phone', 'phoneNumber', 'phone phoneNumber'],
  },
  {
    type: 'faker.phone.phoneNumberFormat',
    keywords: ['phoneNumberFormat', 'phone phoneNumberFormat'],
  },
  {
    type: 'faker.phone.phoneFormats',
    keywords: ['phoneFormats', 'phone phoneFormats'],
  },
  {
    type: 'faker.date.past',
    keywords: ['date', 'past', 'date past', 'createdAt', 'at', 'occuredAt'],
  },
  {
    type: 'faker.date.future',
    keywords: ['future', 'date future', 'schedule', 'at', 'will at'],
  },
  {
    type: 'faker.date.recent',
    keywords: ['recent', 'date recent', 'at', 'updatedAt'],
  },
  {
    type: 'faker.date.soon',
    keywords: ['soon', 'date soon', 'schedule', 'at', 'will at'],
  },
  {
    type: 'faker.date.month',
    keywords: ['month', 'date month'],
  },
  {
    type: 'faker.date.weekday',
    keywords: ['weekday', 'date weekday'],
  },
  {
    type: 'faker.time.recent',
    keywords: ['time', 'time recent'],
  },
  {
    type: 'faker.commerce.color',
    keywords: ['commerce', 'color', 'commerce color'],
  },
  {
    type: 'faker.commerce.department',
    keywords: ['commerce', 'department', 'commerce department'],
  },
  {
    type: 'faker.commerce.productName',
    keywords: ['commerce', 'productName', 'commerce productName'],
  },
  {
    type: 'faker.commerce.price',
    keywords: ['commerce', 'price', 'commerce price'],
  },
  {
    type: 'faker.commerce.productAdjective',
    keywords: ['commerce', 'productAdjective', 'commerce productAdjective'],
  },
  {
    type: 'faker.commerce.productMaterial',
    keywords: ['commerce', 'productMaterial', 'commerce productMaterial'],
  },
  {
    type: 'faker.commerce.product',
    keywords: ['commerce', 'product', 'commerce product'],
  },
  {
    type: 'faker.commerce.productDescription',
    keywords: ['commerce', 'productDescription', 'commerce productDescription'],
  },
  {
    type: 'faker.system.fileName',
    keywords: ['system', 'fileName', 'system fileName'],
  },
  {
    type: 'faker.system.commonFileName',
    keywords: ['system', 'commonFileName', 'system commonFileName'],
  },
  {
    type: 'faker.system.mimeType',
    keywords: ['system', 'mimeType', 'system mimeType'],
  },
  {
    type: 'faker.system.commonFileType',
    keywords: ['system', 'commonFileType', 'system commonFileType'],
  },
  {
    type: 'faker.system.commonFileExt',
    keywords: [
      'system',
      'commonFileExt',
      'system commonFileExt',
      'file extension',
    ],
  },
  {
    type: 'faker.system.fileType',
    keywords: ['system', 'fileType', 'system fileType'],
  },
  {
    type: 'faker.system.fileExt',
    keywords: ['system', 'fileExt', 'system fileExt', 'system file extension'],
  },
  {
    type: 'faker.system.directoryPath',
    keywords: ['system', 'directoryPath', 'system directoryPath', 'dirPath'],
  },
  {
    type: 'faker.system.filePath',
    keywords: ['system', 'filePath', 'system filePath'],
  },
  {
    type: 'faker.system.semver',
    keywords: ['system', 'semver', 'system semver'],
  },
  {
    type: 'faker.git.branch',
    keywords: ['git', 'branch', 'git branch'],
  },
  {
    type: 'faker.git.commitEntry',
    keywords: ['git', 'commitEntry', 'git commitEntry'],
  },
  {
    type: 'faker.git.commitMessage',
    keywords: ['git', 'commitMessage', 'git commitMessage'],
  },
  {
    type: 'faker.git.commitSha',
    keywords: ['git', 'commitSha', 'git commitSha'],
  },
  {
    type: 'faker.git.shortSha',
    keywords: ['git', 'shortSha', 'git shortSha'],
  },
  {
    type: 'faker.vehicle.vehicle',
    keywords: ['vehicle', 'vehicle vehicle', 'car'],
  },
  {
    type: 'faker.vehicle.manufacturer',
    keywords: ['vehicle', 'manufacturer', 'vehicle manufacturer'],
  },
  {
    type: 'faker.vehicle.model',
    keywords: ['vehicle', 'model', 'vehicle model', 'car model'],
  },
  {
    type: 'faker.vehicle.type',
    keywords: ['vehicle', 'vehicle type'],
  },
  {
    type: 'faker.vehicle.fuel',
    keywords: ['vehicle', 'fuel', 'vehicle fuel'],
  },
  {
    type: 'faker.vehicle.vin',
    keywords: ['vehicle', 'vin', 'vehicle vin', 'vin number'],
  },
  {
    type: 'faker.vehicle.color',
    keywords: ['vehicle', 'color', 'vehicle color'],
  },
  {
    type: 'faker.vehicle.vrm',
    keywords: ['vehicle', 'vrm', 'vehicle vrm'],
  },
  {
    type: 'faker.vehicle.bicycle',
    keywords: ['vehicle', 'bicycle', 'vehicle bicycle'],
  },
  {
    type: 'faker.music.genre',
    keywords: ['music', 'genre', 'music genre'],
  },
  {
    type: 'faker.datatype.number',
    keywords: ['datatype', 'number', 'datatype number', 'points', 'credits'],
  },
  {
    type: 'faker.datatype.float',
    keywords: ['datatype', 'float', 'datatype float'],
  },
  {
    type: 'faker.datatype.datetime',
    keywords: [
      'datatype',
      'datetime',
      'date stamp',
      'date',
      'datatype datetime',
    ],
  },
  {
    type: 'faker.datatype.string',
    keywords: ['datatype', 'string', 'datatype string', 'random string text'],
  },
  {
    type: 'faker.datatype.uuid',
    keywords: ['datatype', 'uuid', 'datatype uuid'],
  },
  {
    type: 'faker.datatype.boolean',
    keywords: ['datatype', 'boolean', 'datatype boolean'],
  },
  {
    type: 'faker.datatype.hexaDecimal',
    keywords: ['datatype', 'hexaDecimal', 'datatype hexaDecimal'],
  },
  {
    type: 'faker.datatype.json',
    keywords: ['datatype', 'json', 'datatype json'],
  },
  {
    type: 'faker.datatype.array',
    keywords: ['datatype', 'array', 'datatype array'],
  },
];

// const repeats = new Map();
// for (const category of Object.keys(faker)) {
//   if (
//     [
//       'locale',
//       'locales',
//       'localeFallback',
//       'definitions',
//       'fake',
//       'helpers',
//       'mersenne',
//       'lorempixel',
//       'unsplash',
//       'lorempicsum',
//       'between',
//       'betweens',
//       'unique',
//     ].includes(category)
//   ) {
//     continue;
//   }
//   for (const method of Object.keys(faker[category])) {
//     if (repeats.has(method)) {
//       const temp = repeats.get(method);
//       repeats.set(method, [...temp, category]);
//     } else {
//       repeats.set(method, [category]);
//     }
//     if (method.includes('seed')) {
//       continue;
//     }

//     let temp = `${category}.${method}`;
//     if (typeof faker?.[category]?.[method] === 'function') {
//       temp += ': ' + JSON.stringify(faker[category][method]?.(), null, 2);
//     }
//     console.log(temp);
//   }
// }

// const toPrint = new Array();
// const traverse = (method, path) => {
//   if (typeof method !== 'object') {
//     toPrint.push(path);
//     return;
//   }

//   for (const el of Object.keys(method)) {
//     if (
//       [
//         'locale',
//         'locales',
//         'localeFallback',
//         'definitions',
//         // --- following are not needed in the fuzzy search array
// 'fake',
// 'helpers',
// 'mersenne',
// 'lorempixel',
// 'unsplash',
// 'lorempicsum',
// 'between',
// 'betweens',
// 'unique',
//       ].includes(el)
//     ) {
//       continue;
//     }
//     traverse(method[el], path + '.' + el);
//   }
// };

// traverse(faker, 'faker');

// // console.log(toPrint.length);
// const result = toPrint.map(type => {
//   return {
//     type,
//     keywords: [...type.split('.').slice(1), type.split('.').slice(1).join(' ')],
//   };
// });

// console.log(JSON.stringify(result, null, 2));

// let result2 = types.map(type => `'${type}'`).join(' | ');

// console.log('\nexport type FakerField = ' + result2);

// console.log(repeats);
// // list of repeated same name methods:
// for (const [method, reps] of repeats.entries()) {
//   if (reps.length > 1) {
//     console.log(method, reps);
//   }
// }

const options = {
  keys: ['keywords'],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  includeMatches: true,
};

const fuse = new Fuse(fakerTypes, options);

const result = fuse.search('description');

// console.log(JSON.stringify(result, null, 2));
