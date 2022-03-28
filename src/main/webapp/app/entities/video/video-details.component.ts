import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVideo } from '@/shared/model/video.model';
import VideoService from './video.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class VideoDetails extends Vue {
  @Inject('videoService') private videoService: () => VideoService;
  @Inject('alertService') private alertService: () => AlertService;

  public video: IVideo = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.videoId) {
        vm.retrieveVideo(to.params.videoId);
      }
    });
  }

  public retrieveVideo(videoId) {
    this.videoService()
      .find(videoId)
      .then(res => {
        this.video = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
