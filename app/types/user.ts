export default interface UserType {
  country: string;
  location: {
    name: string;
    id: string;
    coordinates: {
      _latitude: number;
      _longitude: number;
    };
  };
  email: string;
  uid: string;
  username: string;
  id: string;
}
