import ClientProfile from '../Coach/ClientProfile';
import PostDetail from '../Post/PostDetail';
import CreateProgram from './CreateProgram';
import LiftDetail from './LiftDetail';

export default {
  VisitingProfile: {
    name: 'Visiting Profile',
    screen: ClientProfile
  },
  VisitingProfilePostDetail: {
    name: 'Visiting Profile Post Detail',
    screen: PostDetail
  },
  CreateProgram: {
    name: 'Create Program',
    screen: CreateProgram
  },
  LiftDetail: {
    name: 'Lift Detail',
    screen: LiftDetail
  }
};
