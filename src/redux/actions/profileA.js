import {
  userProfile,
  userAboutMeUpdate,
  userOccupationUpdate,
  userBirthDayUpdate,
  userLocationUpdate,
  sendPhoto,
  removePhoto,
  selectPhoto,
} from '../../../service/service';
import {PROCESSING_END} from './authA';

export const PROCESSING = 'PROCESSING';
export const SET_PROFILE = 'SET_PROFILE';
export const CLEAR = 'CLEAR';
export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_BIRTHDAY = 'SET_BIRTHDAY';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_ABOUT_ME = 'SET_ABOUT_ME';
export const SET_OCCUPATION = 'SET_OCCUPATION';
export const GALLERY_ADD_PHOTO = 'GALLERY_ADD_PHOTO';
export const GALLERY_REMOVE_PHOTO = 'GALLERY_REMOVE_PHOTO';
export const GALLERY_SELECT_PHOTO = 'GALLERY_SELECT_PHOTO';

const dProcessing = () => {
  return {
    type: PROCESSING,
  };
};

const dProcessingEnd = () => {
  return {
    type: PROCESSING_END,
  };
};

export const dSetProfile = payload => {
  return {
    type: SET_PROFILE,
    payload,
  };
};

const dSetAboutMe = aboutMe => {
  return {
    type: SET_ABOUT_ME,
    payload: {aboutMe},
  };
};

const dSetOccupation = occupation => {
  return {
    type: SET_OCCUPATION,
    payload: {occupation},
  };
};

const dSetBirthday = payload => {
  return {
    type: SET_BIRTHDAY,
    payload,
  };
};

const dSetLocation = payload => {
  return {
    type: SET_LOCATION,
    payload,
  };
};

const dGalleryAddPhoto = payload => {
  return {
    type: GALLERY_ADD_PHOTO,
    payload,
  };
};

const dGalleryRemovePhoto = id => {
  return {
    type: GALLERY_REMOVE_PHOTO,
    payload: {id},
  };
};

const dGallerySelectPhoto = payload => {
  return {
    type: GALLERY_SELECT_PHOTO,
    payload,
  };
};

const dClear = () => {
  return {
    type: CLEAR,
  };
};

export function getProfile() {
  return async dispatch => {
    dispatch(dProcessing());
    const profileResult = await userProfile().catch(() => false);
    if (!profileResult.status) {
      return false;
    }
    if (profileResult.status) {
      const parsedData = {
        email: profileResult.data.email,
        name: profileResult.data.name,
        gender: profileResult.data.gender,
        registeredAt: profileResult.data.registered_at,
        birthday: profileResult.data.birthday,
        age: profileResult.data.age,
        city:
          profileResult.data.city && profileResult.data.city.city
            ? profileResult.data.city.city
            : null,
        countryCode:
          profileResult.data.city && profileResult.data.city.country_code
            ? profileResult.data.city.country_code
            : null,
        profilePhoto: profileResult.data.profile_photo,
        lat: profileResult.data.location.lat,
        long: profileResult.data.location.long,
        aboutMe: profileResult.data.about_me,
        occupation: profileResult.data.occupation,
        gallery: profileResult.data.gallery
          ? profileResult.data.gallery.map(item => ({
              id: item.id,
              isProfilePhoto: item.is_profile_photo,
              big: item.big,
              medium: item.medium,
            }))
          : [],
      };
      dispatch(dSetProfile(parsedData));
      return parsedData;
    }
  };
}

export function updateAboutMe(aboutMe) {
  return async dispatch => {
    dispatch(dProcessing());
    const aboutMeResult = await userAboutMeUpdate(aboutMe).catch(() => {
      dispatch(dProcessingEnd());
      return false;
    });
    if (aboutMeResult.status) {
      dispatch(dSetAboutMe(aboutMe));
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function updateOccupation(occupation) {
  return async dispatch => {
    dispatch(dProcessing());
    const occupationResult = await userOccupationUpdate(occupation).catch(
      () => {
        dispatch(dProcessingEnd());
        return false;
      },
    );
    if (occupationResult.status) {
      dispatch(dSetOccupation(occupation));
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function updateBirthday(birthday) {
  return async dispatch => {
    dispatch(dProcessing());
    const birthdayResult = await userBirthDayUpdate(birthday).catch(() => {
      dispatch(dProcessingEnd());
      return false;
    });
    if (birthdayResult.status) {
      dispatch(dSetBirthday(birthday));
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function updateLocation(payload) {
  return async dispatch => {
    dispatch(dProcessing());
    const locationResult = await userLocationUpdate(payload).catch(() => {
      dispatch(dProcessingEnd());
      return false;
    });
    if (locationResult.status) {
      dispatch(
        dSetLocation({
          city:
            locationResult.data.city && locationResult.data.city.city
              ? locationResult.data.city.city
              : null,
          countryCode:
            locationResult.data.city && locationResult.data.city.country_code
              ? locationResult.data.city.country_code
              : null,
          lat: locationResult.data.location.lat,
          long: locationResult.data.location.long,
        }),
      );
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function addGalleryPhoto(base64) {
  return async dispatch => {
    dispatch(dProcessing());
    const photoResult = await sendPhoto(base64).catch(() => {
      dispatch(dProcessingEnd());
      return false;
    });
    if (photoResult.status) {
      dispatch(
        dGalleryAddPhoto({
          id: photoResult.data.id,
          isProfilePhoto: photoResult.data.is_profile_photo,
          big: photoResult.data.big,
          medium: photoResult.data.medium,
        }),
      );
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function removeGalleryPhoto(id) {
  return async dispatch => {
    dispatch(dProcessing());
    const removeResult = await removePhoto(id).catch(() => {
      dispatch(dProcessingEnd());
      return false;
    });
    if (removeResult.status) {
      dispatch(dGalleryRemovePhoto(id));
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function selectGalleryPhoto(id) {
  return async dispatch => {
    dispatch(dProcessing());
    const selectResult = await selectPhoto(id).catch(() => {
      dispatch(dProcessingEnd());
      return false;
    });
    if (selectResult.status) {
      dispatch(dGallerySelectPhoto(id));
      return true;
    } else {
      dispatch(dProcessingEnd());
      return false;
    }
  };
}

export function clearProfile() {
  dispatch(dClear());
}
