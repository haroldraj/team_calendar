const CONFIG = {
  base_url: 'http://localhost:3000',
  //base_url: 'api/mock',
  //base_url: 'http://api:3000',
  Authorization: `Bearer ${localStorage.getItem('user_token')} `,
  token_key: 'user_token',
}
export default CONFIG