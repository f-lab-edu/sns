// import UserService from '../users/services/user_service';
// import UserRepository from '../users/repositories/user_repository';
import NewsfeedService from '../newsfeed/services/newsfeed_service';
import { initDB } from '../config/db';
import { beforeAll } from '@jest/globals';

import FollowService from '../follow/services/follow_service';
import PostService from '../post/services/post_service';

describe('NewsfeedService', () => {
  beforeAll(async () => {
    await initDB();
    await insertTestData();
  });

  afterEach(() => {
    // jest.clearAllMocks(); // 각 테스트 후 모킹을 초기화합니다.
  });


  async function insertTestData() {

    // NOTE -배열 인덱스 잘못 접근하는경우 못 잡아주나?
    const users = ['a','b','c'];

    //TODO eslint no-extra-index, array-func plugin
    await addFollower(users[0], users[1]);
    await addFollower(users[1], users[2]);
    await addFollower(users[2], users[1]);
    await addFollower(users[2], users[0]);

    await addPost({userId: users[0], content: 'contenta1', title: 'titlea1'});
    await addPost({userId: users[1], content: 'content2', title: 'title2'});
    await addPost({userId: users[1], content: 'content3', title: 'title3'});
    await addPost({userId: users[2], content: 'content4', title: 'title4'});


    // REVIEW - 테스트코드인데 다른 service를 가져와서 테스트하는게 괜찮은지 고민
    async function addFollower(userId, targetId) {
        FollowService.addFollow({userId, targetId})
    }

    async function addPost(postData) {
        PostService.addPost(postData);
    }
  } 

  
  test('뉴스피드를 생성한다', async () => {
    const userId = 'a';
    const result = await NewsfeedService.createNewsfeed(userId);
    expect(result.length).toBe(2);
  });


//   test('유저ID를 받아 해당 유저의 뉴스피드를 반환한다.', async () => {
//     const postData = {
//         userId: 'follow1',
//         content: 'content1',
//         title: 'title1',
//     }

//     const postData2 = {
//         userId: 'follow1',
//         content: 'content2',
//         title: 'title2',
//     }

//     const userId = '123';

//     // const name = 'testUser';
//     const result = await NewsfeedService.getNewsfeedByUser(userId);
//     expect(result.length).toBe(2);
//   });

});
