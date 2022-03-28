/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import VideoComponent from '@/entities/video/video.vue';
import VideoClass from '@/entities/video/video.component';
import VideoService from '@/entities/video/video.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Video Management Component', () => {
    let wrapper: Wrapper<VideoClass>;
    let comp: VideoClass;
    let videoServiceStub: SinonStubbedInstance<VideoService>;

    beforeEach(() => {
      videoServiceStub = sinon.createStubInstance<VideoService>(VideoService);
      videoServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VideoClass>(VideoComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          videoService: () => videoServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      videoServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVideos();
      await comp.$nextTick();

      // THEN
      expect(videoServiceStub.retrieve.called).toBeTruthy();
      expect(comp.videos[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      videoServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(videoServiceStub.retrieve.callCount).toEqual(1);

      comp.removeVideo();
      await comp.$nextTick();

      // THEN
      expect(videoServiceStub.delete.called).toBeTruthy();
      expect(videoServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
