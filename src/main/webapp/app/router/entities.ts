import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Video = () => import('@/entities/video/video.vue');
// prettier-ignore
const VideoUpdate = () => import('@/entities/video/video-update.vue');
// prettier-ignore
const VideoDetails = () => import('@/entities/video/video-details.vue');
// prettier-ignore
const Rating = () => import('@/entities/rating/rating.vue');
// prettier-ignore
const RatingUpdate = () => import('@/entities/rating/rating-update.vue');
// prettier-ignore
const RatingDetails = () => import('@/entities/rating/rating-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'video',
      name: 'Video',
      component: Video,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'video/new',
      name: 'VideoCreate',
      component: VideoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'video/:videoId/edit',
      name: 'VideoEdit',
      component: VideoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'video/:videoId/view',
      name: 'VideoView',
      component: VideoDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'rating',
      name: 'Rating',
      component: Rating,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'rating/new',
      name: 'RatingCreate',
      component: RatingUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'rating/:ratingId/edit',
      name: 'RatingEdit',
      component: RatingUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'rating/:ratingId/view',
      name: 'RatingView',
      component: RatingDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
