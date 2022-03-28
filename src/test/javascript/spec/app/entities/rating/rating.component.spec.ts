/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import RatingComponent from '@/entities/rating/rating.vue';
import RatingClass from '@/entities/rating/rating.component';
import RatingService from '@/entities/rating/rating.service';
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
  describe('Rating Management Component', () => {
    let wrapper: Wrapper<RatingClass>;
    let comp: RatingClass;
    let ratingServiceStub: SinonStubbedInstance<RatingService>;

    beforeEach(() => {
      ratingServiceStub = sinon.createStubInstance<RatingService>(RatingService);
      ratingServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RatingClass>(RatingComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          ratingService: () => ratingServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      ratingServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRatings();
      await comp.$nextTick();

      // THEN
      expect(ratingServiceStub.retrieve.called).toBeTruthy();
      expect(comp.ratings[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      ratingServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(ratingServiceStub.retrieve.callCount).toEqual(1);

      comp.removeRating();
      await comp.$nextTick();

      // THEN
      expect(ratingServiceStub.delete.called).toBeTruthy();
      expect(ratingServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
