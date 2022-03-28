/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import RatingDetailComponent from '@/entities/rating/rating-details.vue';
import RatingClass from '@/entities/rating/rating-details.component';
import RatingService from '@/entities/rating/rating.service';
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
  describe('Rating Management Detail Component', () => {
    let wrapper: Wrapper<RatingClass>;
    let comp: RatingClass;
    let ratingServiceStub: SinonStubbedInstance<RatingService>;

    beforeEach(() => {
      ratingServiceStub = sinon.createStubInstance<RatingService>(RatingService);

      wrapper = shallowMount<RatingClass>(RatingDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { ratingService: () => ratingServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRating = { id: 123 };
        ratingServiceStub.find.resolves(foundRating);

        // WHEN
        comp.retrieveRating(123);
        await comp.$nextTick();

        // THEN
        expect(comp.rating).toBe(foundRating);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRating = { id: 123 };
        ratingServiceStub.find.resolves(foundRating);

        // WHEN
        comp.beforeRouteEnter({ params: { ratingId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.rating).toBe(foundRating);
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
