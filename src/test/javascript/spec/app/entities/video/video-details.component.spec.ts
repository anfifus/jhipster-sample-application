/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import VideoDetailComponent from '@/entities/video/video-details.vue';
import VideoClass from '@/entities/video/video-details.component';
import VideoService from '@/entities/video/video.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Video Management Detail Component', () => {
    let wrapper: Wrapper<VideoClass>;
    let comp: VideoClass;
    let videoServiceStub: SinonStubbedInstance<VideoService>;

    beforeEach(() => {
      videoServiceStub = sinon.createStubInstance<VideoService>(VideoService);

      wrapper = shallowMount<VideoClass>(VideoDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { videoService: () => videoServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVideo = { id: 123 };
        videoServiceStub.find.resolves(foundVideo);

        // WHEN
        comp.retrieveVideo(123);
        await comp.$nextTick();

        // THEN
        expect(comp.video).toBe(foundVideo);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundVideo = { id: 123 };
        videoServiceStub.find.resolves(foundVideo);

        // WHEN
        comp.beforeRouteEnter({ params: { videoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.video).toBe(foundVideo);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
