import Avatar from '@material-ui/core/Avatar';

export default function Profile() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1 style={{ margin: 15 }}>Profile</h1>
      <Avatar style={{ margin: 15 }} src='/broken-image.jpg' />
    </div>
  );
}
