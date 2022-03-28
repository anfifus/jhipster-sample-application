import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import VideoService from './video/video.service';
import RatingService from './rating/rating.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('videoService') private videoService = () => new VideoService();
  @Provide('ratingService') private ratingService = () => new RatingService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
