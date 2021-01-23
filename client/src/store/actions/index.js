import { fromPairs } from 'lodash';

export {
    auth,
    logout,
    setAuthRedircetPath,
    authCheckState
} from '../../containers/Auth/store/actions/auth';

export {
fetchLoggedUser,
fetchLoggedUserItems
} from '../../containers/Profile/store/actions/profile';

export {
addItem
} from '../../components/Items/store/actions/items';

