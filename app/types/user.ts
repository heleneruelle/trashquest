export default interface UserType {
  country: string;
  location: {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
  };
  email: string;
  uid: string;
  username: string;
}
