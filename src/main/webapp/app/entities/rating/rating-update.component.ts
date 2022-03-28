import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

import VideoService from '@/entities/video/video.service';
import { IVideo } from '@/shared/model/video.model';

import { IRating, Rating } from '@/shared/model/rating.model';
import RatingService from './rating.service';

const validations: any = {
  rating: {
    puntuation: {},
    date: {},
  },
};

@Component({
  validations,
})
export default class RatingUpdate extends Vue {
  @Inject('ratingService') private ratingService: () => RatingService;
  @Inject('alertService') private alertService: () => AlertService;

  public rating: IRating = new Rating();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('videoService') private videoService: () => VideoService;

  public videos: IVideo[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ratingId) {
        vm.retrieveRating(to.params.ratingId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.rating.id) {
      this.ratingService()
        .update(this.rating)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.rating.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.ratingService()
        .create(this.rating)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationApp.rating.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.rating[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.rating[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.rating[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.rating[field] = null;
    }
  }

  public retrieveRating(ratingId): void {
    this.ratingService()
      .find(ratingId)
      .then(res => {
        res.date = new Date(res.date);
        this.rating = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.videoService()
      .retrieve()
      .then(res => {
        this.videos = res.data;
      });
  }
}
