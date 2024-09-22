import {nanoid} from 'nanoid';
import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    'id': 'a6263f1b-64de-45ae-93f2-275ebd566439',
    'basePrice': 1077,
    'dateFrom': '2024-08-30T13:04:10.038Z',
    'dateTo': '2024-08-31T03:33:10.038Z',
    'destination': '1cf86b06-e5d8-4fb0-9084-dff6faaf6d18',
    'isFavorite': false,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': '33fb41a4-9a68-4fc1-905a-1accd77157a3',
    'basePrice': 5515,
    'dateFrom': '2024-09-01T14:08:10.038Z',
    'dateTo': '2024-09-02T21:03:10.038Z',
    'destination': '733a7d11-615f-4421-b548-7ad7832b79c1',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'd7c4bc49-c593-4cc2-91d9-80e8c8a0d0eb',
    'basePrice': 3262,
    'dateFrom': '2024-09-04T14:21:10.038Z',
    'dateTo': '2024-09-06T00:08:10.038Z',
    'destination': '1cf86b06-e5d8-4fb0-9084-dff6faaf6d18',
    'isFavorite': true,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': '5a493b2f-9521-40e3-b0c0-15f688482a27',
    'basePrice': 2514,
    'dateFrom': '2024-09-07T05:55:10.038Z',
    'dateTo': '2024-09-08T09:37:10.038Z',
    'destination': 'b4e50dbd-9525-48cd-a47f-67cc08025912',
    'isFavorite': true,
    'offers': [
      '76e2af55-252a-4035-9732-0d2ff2b49db2'
    ],
    'type': 'restaurant'
  },
  {
    'id': '810ce458-278a-44ef-9ef5-6d1c628b3a23',
    'basePrice': 8145,
    'dateFrom': '2024-09-09T03:03:10.038Z',
    'dateTo': '2024-09-10T05:06:10.038Z',
    'destination': 'e9d6f17b-c3f3-4445-b98e-74bdeaee2e9b',
    'isFavorite': true,
    'offers': [
      'cbab2ac1-f371-40c5-b00e-cd6afb26a547',
      '1705434e-2ad5-4276-8048-25441ece631f'
    ],
    'type': 'flight'
  },
  {
    'id': 'd5997906-d612-4346-8e0c-4b993381cc51',
    'basePrice': 9825,
    'dateFrom': '2024-09-11T00:55:10.038Z',
    'dateTo': '2024-09-11T22:00:10.038Z',
    'destination': '1cf86b06-e5d8-4fb0-9084-dff6faaf6d18',
    'isFavorite': true,
    'offers': [
      '943c13cf-4dcb-4f84-8394-8acd2b2e67ba',
      '76e2af55-252a-4035-9732-0d2ff2b49db2'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'e1a90be4-16e8-46d1-8e4c-c4ca91ecdf9c',
    'basePrice': 5428,
    'dateFrom': '2024-09-13T01:19:10.038Z',
    'dateTo': '2024-09-14T04:02:10.038Z',
    'destination': '8cbb6d07-3758-40a9-b48d-973d8f07e6cd',
    'isFavorite': true,
    'offers': [
      '77a26089-c3ce-4f8d-9b49-70c5197ea02e',
      '7275cbad-122b-4b17-a0ea-6d960eef2b97',
      'b62080b2-42f6-43a7-9dfd-f749ce32a40e',
      '55eaf254-ea26-49f5-b708-02d562f2ff50',
      'dfb2196a-3d0f-4cf3-8e28-2e9372d12e7b'
    ],
    'type': 'check-in'
  },
  {
    'id': 'afd44e14-31b1-4642-9297-b3f10bcc4b0d',
    'basePrice': 1281,
    'dateFrom': '2024-09-15T02:35:10.038Z',
    'dateTo': '2024-09-16T10:05:10.038Z',
    'destination': 'e9d6f17b-c3f3-4445-b98e-74bdeaee2e9b',
    'isFavorite': false,
    'offers': [
      '943c13cf-4dcb-4f84-8394-8acd2b2e67ba',
      '76e2af55-252a-4035-9732-0d2ff2b49db2'
    ],
    'type': 'restaurant'
  },
  {
    'id': '75139210-c3dc-4d4b-8fff-c5eeb1a0f6a4',
    'basePrice': 7066,
    'dateFrom': '2024-09-17T17:34:10.038Z',
    'dateTo': '2024-09-19T17:19:10.038Z',
    'destination': '8cbb6d07-3758-40a9-b48d-973d8f07e6cd',
    'isFavorite': false,
    'offers': [
      'ee39cecf-bd06-40c3-8daa-bef799ca4f59',
      '2c9898c7-b1e9-44ad-be51-e9ce28d01120',
      '7bef7ef8-223c-4945-9f9d-daac85eabfd9',
      '9b2abd8a-cded-4e53-b13f-8a7c24a61d93',
      'cbab2ac1-f371-40c5-b00e-cd6afb26a547',
      '1705434e-2ad5-4276-8048-25441ece631f'
    ],
    'type': 'flight'
  },
  {
    'id': '69d84615-c0a5-4793-8be1-766da05e5afd',
    'basePrice': 8962,
    'dateFrom': '2024-09-21T14:58:10.038Z',
    'dateTo': '2024-09-23T14:38:10.038Z',
    'destination': 'f3ce1e9f-d82c-4ebd-b93d-15f48e2baadb',
    'isFavorite': false,
    'offers': [
      '2c9898c7-b1e9-44ad-be51-e9ce28d01120',
      '7bef7ef8-223c-4945-9f9d-daac85eabfd9',
      '9b2abd8a-cded-4e53-b13f-8a7c24a61d93',
      'cbab2ac1-f371-40c5-b00e-cd6afb26a547',
      '1705434e-2ad5-4276-8048-25441ece631f'
    ],
    'type': 'flight'
  },
  {
    'id': 'c3c45137-eacb-4422-8c99-236879713413',
    'basePrice': 9155,
    'dateFrom': '2024-09-24T06:48:10.038Z',
    'dateTo': '2024-09-25T00:39:10.038Z',
    'destination': 'e385a3ce-2e95-4262-989f-51799f504408',
    'isFavorite': true,
    'offers': [
      '76e2af55-252a-4035-9732-0d2ff2b49db2'
    ],
    'type': 'restaurant'
  },
  {
    'id': '6ddd61bd-86fc-4682-a6d1-e84007f09a3c',
    'basePrice': 8459,
    'dateFrom': '2024-09-26T20:26:10.038Z',
    'dateTo': '2024-09-27T08:47:10.038Z',
    'destination': '8cbb6d07-3758-40a9-b48d-973d8f07e6cd',
    'isFavorite': true,
    'offers': [
      '87b6c88d-99d6-46c7-aeaa-348607d5f870',
      '3115fd86-e4ff-40a5-8ff8-0ba4bd397a1e'
    ],
    'type': 'ship'
  },
  {
    'id': '7fdbd08b-fdee-427d-a2dd-369d1ed92181',
    'basePrice': 4948,
    'dateFrom': '2024-09-28T23:56:10.038Z',
    'dateTo': '2024-09-30T11:47:10.038Z',
    'destination': 'e385a3ce-2e95-4262-989f-51799f504408',
    'isFavorite': true,
    'offers': [
      'c59b78ac-d5fb-4f88-8034-ceaae508d2e4'
    ],
    'type': 'taxi'
  },
  {
    'id': '783e2a90-15e2-4b5c-a13f-834ad1d53794',
    'basePrice': 6834,
    'dateFrom': '2024-10-01T23:18:10.038Z',
    'dateTo': '2024-10-02T19:28:10.038Z',
    'destination': '8cbb6d07-3758-40a9-b48d-973d8f07e6cd',
    'isFavorite': true,
    'offers': [
      'cbab2ac1-f371-40c5-b00e-cd6afb26a547',
      '1705434e-2ad5-4276-8048-25441ece631f'
    ],
    'type': 'flight'
  },
  {
    'id': 'f1e189b2-069d-4689-bda0-101a81e8e2ab',
    'basePrice': 7263,
    'dateFrom': '2024-10-03T23:36:10.038Z',
    'dateTo': '2024-10-04T12:34:10.038Z',
    'destination': 'e9d6f17b-c3f3-4445-b98e-74bdeaee2e9b',
    'isFavorite': false,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': '4b9bfaa5-45c6-4880-b200-856a42c807d4',
    'basePrice': 6120,
    'dateFrom': '2024-10-06T04:20:10.038Z',
    'dateTo': '2024-10-07T15:45:10.038Z',
    'destination': 'e9d6f17b-c3f3-4445-b98e-74bdeaee2e9b',
    'isFavorite': false,
    'offers': [
      '76e2af55-252a-4035-9732-0d2ff2b49db2'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'c2b3ebac-324a-4cb9-b569-99263b22b2ed',
    'basePrice': 2388,
    'dateFrom': '2024-10-09T03:31:10.038Z',
    'dateTo': '2024-10-09T23:42:10.038Z',
    'destination': 'e3e9c36e-3116-4046-bf6e-ba3d2a55b22d',
    'isFavorite': false,
    'offers': [
      '77a26089-c3ce-4f8d-9b49-70c5197ea02e',
      '7275cbad-122b-4b17-a0ea-6d960eef2b97',
      'b62080b2-42f6-43a7-9dfd-f749ce32a40e',
      '55eaf254-ea26-49f5-b708-02d562f2ff50',
      'dfb2196a-3d0f-4cf3-8e28-2e9372d12e7b'
    ],
    'type': 'check-in'
  },
  {
    'id': '0d699578-3840-45ff-aaaf-d0fbb7582511',
    'basePrice': 7952,
    'dateFrom': '2024-10-10T15:12:10.038Z',
    'dateTo': '2024-10-12T14:57:10.038Z',
    'destination': 'f3ce1e9f-d82c-4ebd-b93d-15f48e2baadb',
    'isFavorite': false,
    'offers': [
      '9a040cfd-14fe-4967-9a12-389ff2a98683',
      '9043c8fd-9f4a-4f9e-b97c-e854e8e7daef',
      '19ef9851-caa9-4530-a8fe-dc03e7b0485a',
      '87b6c88d-99d6-46c7-aeaa-348607d5f870',
      '3115fd86-e4ff-40a5-8ff8-0ba4bd397a1e'
    ],
    'type': 'ship'
  },
  {
    'id': '87c9f6f9-2d51-4ad0-8ea7-5db3b3d64bbe',
    'basePrice': 4888,
    'dateFrom': '2024-10-14T02:07:10.038Z',
    'dateTo': '2024-10-15T14:13:10.038Z',
    'destination': '2c5a64ff-3d19-4961-8126-85fad7240df8',
    'isFavorite': true,
    'offers': [
      '9043c8fd-9f4a-4f9e-b97c-e854e8e7daef',
      '19ef9851-caa9-4530-a8fe-dc03e7b0485a',
      '87b6c88d-99d6-46c7-aeaa-348607d5f870',
      '3115fd86-e4ff-40a5-8ff8-0ba4bd397a1e'
    ],
    'type': 'ship'
  },
  {
    'id': 'c4d9eb6d-d606-48dd-b347-1262d14720fa',
    'basePrice': 5615,
    'dateFrom': '2024-10-17T13:07:10.038Z',
    'dateTo': '2024-10-19T01:03:10.038Z',
    'destination': '2c5a64ff-3d19-4961-8126-85fad7240df8',
    'isFavorite': true,
    'offers': [
      '6147bc88-8de5-48af-a832-bfe828f81dd0',
      '575ef478-35fb-404b-bc85-ef9bfd87ff2a'
    ],
    'type': 'bus'
  },
  {
    'id': 'd6b5d16f-13b3-4d66-90b5-7412daa71e1e',
    'basePrice': 4601,
    'dateFrom': '2024-10-20T08:01:10.038Z',
    'dateTo': '2024-10-21T02:16:10.038Z',
    'destination': 'e9d6f17b-c3f3-4445-b98e-74bdeaee2e9b',
    'isFavorite': true,
    'offers': [
      '943c13cf-4dcb-4f84-8394-8acd2b2e67ba',
      '76e2af55-252a-4035-9732-0d2ff2b49db2'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'b769d499-303c-41e6-a70a-67a206836f87',
    'basePrice': 3519,
    'dateFrom': '2024-10-23T01:06:10.038Z',
    'dateTo': '2024-10-23T11:33:10.038Z',
    'destination': 'e385a3ce-2e95-4262-989f-51799f504408',
    'isFavorite': true,
    'offers': [
      '095fb1bc-707a-436e-beae-04449d3acb07',
      '6147bc88-8de5-48af-a832-bfe828f81dd0',
      '575ef478-35fb-404b-bc85-ef9bfd87ff2a'
    ],
    'type': 'bus'
  },
  {
    'id': '39d7512d-6a4a-4142-8ac0-8f0eae7f1b20',
    'basePrice': 3848,
    'dateFrom': '2024-10-25T11:41:10.038Z',
    'dateTo': '2024-10-25T22:04:10.038Z',
    'destination': '1cf86b06-e5d8-4fb0-9084-dff6faaf6d18',
    'isFavorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '8bd1eac0-549d-4bff-8c5b-2a711cd36967',
    'basePrice': 2759,
    'dateFrom': '2024-10-26T17:05:10.038Z',
    'dateTo': '2024-10-27T01:09:10.038Z',
    'destination': '8cbb6d07-3758-40a9-b48d-973d8f07e6cd',
    'isFavorite': true,
    'offers': [
      '7275cbad-122b-4b17-a0ea-6d960eef2b97',
      'b62080b2-42f6-43a7-9dfd-f749ce32a40e',
      '55eaf254-ea26-49f5-b708-02d562f2ff50',
      'dfb2196a-3d0f-4cf3-8e28-2e9372d12e7b'
    ],
    'type': 'check-in'
  },
  {
    'id': 'e7fca5e0-00e2-489f-8037-72812566812b',
    'basePrice': 6055,
    'dateFrom': '2024-10-27T12:53:10.038Z',
    'dateTo': '2024-10-28T12:19:10.038Z',
    'destination': '1cf86b06-e5d8-4fb0-9084-dff6faaf6d18',
    'isFavorite': true,
    'offers': [
      '3115fd86-e4ff-40a5-8ff8-0ba4bd397a1e'
    ],
    'type': 'ship'
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints),
  };
}

export {getRandomPoint};
