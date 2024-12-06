import ProfileViewPage from './_components/profile-view-page';

// type pageProps = {
//   searchParams: SearchParams;
// };

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page() {
  return <ProfileViewPage />;
}
