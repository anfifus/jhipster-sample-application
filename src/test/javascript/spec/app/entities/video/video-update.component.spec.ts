/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import VideoUpdateComponent from '@/entities/video/video-update.vue';
import VideoClass from '@/entities/video/video-update.component';
import VideoService from '@/entities/video/video.service';

import UserService from '@/entities/user/user.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Video Management Update Component', () => {
    let wrapper: Wrapper<VideoClass>;
    let comp: VideoClass;
    let videoServiceStub: SinonStubbedInstance<VideoService>;

    beforeEach(() => {
      videoServiceStub = sinon.createStubInstance<VideoService>(VideoService);

      wrapper = shallowMount<VideoClass>(VideoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          videoService: () => videoServiceStub,
          alertService: () => new AlertService(),

          userService: () => new UserService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.video = entity;
        videoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(videoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.video = entity;
        videoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(videoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundVideo = { id: 123 };
        videoServiceStub.find.resolves(foundVideo);
        videoServiceStub.retrieve.resolves([foundVideo]);

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
