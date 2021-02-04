import { fromPairs } from 'lodash';

export {
    auth,
    logout,
    setAuthRedircetPath,
    authCheckState
} from '../../containers/Auth/store/actions/auth';

export {
fetchLoggedUser,

} from '../../containers/Profile/store/actions/profile';

export {
addItem,
removeItem,
shareItem,
fetchLoggedUserItems,
likeItem,
unlikeItem,
resetItem
} from '../../components/Items/store/actions/items';

