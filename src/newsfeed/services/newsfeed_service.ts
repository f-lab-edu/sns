import PostService from '../../post/services/post_service';
import FollowService from '../../follow/services/follow_service';
import { Post } from '../../post/models/post';

async function getNewsfeedByUser(userId: string):Promise<Post[]> {
    return createNewsfeed(userId);
}

async function createNewsfeed(userId: string):Promise<Post[]> {
    const result = getFollowingPosts(userId);
    return result;
}

async function getFollowingPosts(userId: string):Promise<Post[]> {
    const followings = await FollowService.getFollowings(userId);
    const allPosts = [];
    for (const following of followings) {
        const posts = await PostService.getAllPostsByUser(following.targetId);
        allPosts.push(...posts);
    }

    return allPosts;
}

export default {
    getNewsfeedByUser,
    createNewsfeed,
}