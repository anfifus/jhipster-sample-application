<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.rating.home.createOrEditLabel"
          data-cy="RatingCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.rating.home.createOrEditLabel')"
        >
          Create or edit a Rating
        </h2>
        <div>
          <div class="form-group" v-if="rating.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="rating.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.rating.puntuation')" for="rating-puntuation"
              >Puntuation</label
            >
            <input
              type="number"
              class="form-control"
              name="puntuation"
              id="rating-puntuation"
              data-cy="puntuation"
              :class="{ valid: !$v.rating.puntuation.$invalid, invalid: $v.rating.puntuation.$invalid }"
              v-model.number="$v.rating.puntuation.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.rating.date')" for="rating-date">Date</label>
            <div class="d-flex">
              <input
                id="rating-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.rating.date.$invalid, invalid: $v.rating.date.$invalid }"
                :value="convertDateTimeFromServer($v.rating.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.rating.rating')" for="rating-rating">Rating</label>
            <select class="form-control" id="rating-rating" data-cy="rating" name="rating" v-model="rating.rating">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="rating.rating && userOption.id === rating.rating.id ? rating.rating : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.rating.rating')" for="rating-rating">Rating</label>
            <select class="form-control" id="rating-rating" data-cy="rating" name="rating" v-model="rating.rating">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="rating.rating && videoOption.id === rating.rating.id ? rating.rating : videoOption"
                v-for="videoOption in videos"
                :key="videoOption.id"
              >
                {{ videoOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.rating.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./rating-update.component.ts"></script>
