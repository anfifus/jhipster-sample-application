<template>
  <div>
    <h2 id="page-heading" data-cy="RatingHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.rating.home.title')" id="rating-heading">Ratings</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.rating.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'RatingCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-rating"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.rating.home.createLabel')"> Create a new Rating </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ratings && ratings.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.rating.home.notFound')">No ratings found</span>
    </div>
    <div class="table-responsive" v-if="ratings && ratings.length > 0">
      <table class="table table-striped" aria-describedby="ratings">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.rating.puntuation')">Puntuation</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.rating.date')">Date</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.rating.rating')">Rating</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.rating.rating')">Rating</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rating in ratings" :key="rating.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RatingView', params: { ratingId: rating.id } }">{{ rating.id }}</router-link>
            </td>
            <td>{{ rating.puntuation }}</td>
            <td>{{ rating.date ? $d(Date.parse(rating.date), 'short') : '' }}</td>
            <td>
              {{ rating.rating ? rating.rating.id : '' }}
            </td>
            <td>
              <div v-if="rating.rating">
                <router-link :to="{ name: 'VideoView', params: { videoId: rating.rating.id } }">{{ rating.rating.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'RatingView', params: { ratingId: rating.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'RatingEdit', params: { ratingId: rating.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(rating)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="jhipsterSampleApplicationApp.rating.delete.question"
          data-cy="ratingDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-rating-heading" v-text="$t('jhipsterSampleApplicationApp.rating.delete.question', { id: removeId })">
          Are you sure you want to delete this Rating?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-rating"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeRating()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./rating.component.ts"></script>
