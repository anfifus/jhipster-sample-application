import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IVideo } from '@/shared/model/video.model';

import VideoService from './video.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Video extends Vue {
  @Inject('videoService') private videoService: () => VideoService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public videos: IVideo[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllVideos();
  }

  public clear(): void {
    this.retrieveAllVideos();
  }

  public retrieveAllVideos(): void {
    this.isFetching = true;
    this.videoService()
      .retrieve()
      .then(
        res => {
          this.videos = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IVideo): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeVideo(): void {
    this.videoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterSampleApplicationApp.video.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllVideos();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
