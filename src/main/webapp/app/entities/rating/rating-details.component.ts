import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRating } from '@/shared/model/rating.model';
import RatingService from './rating.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class RatingDetails extends Vue {
  @Inject('ratingService') private ratingService: () => RatingService;
  @Inject('alertService') private alertService: () => AlertService;

  public rating: IRating = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ratingId) {
        vm.retrieveRating(to.params.ratingId);
      }
    });
  }

  public retrieveRating(ratingId) {
    this.ratingService()
      .find(ratingId)
      .then(res => {
        this.rating = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
