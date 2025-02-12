type isValidTokenProps = {
  accesstoken?: string;
  refreshtoken?: string;
};
type ValidTokenResult = {
  isAccessTokenValid?: boolean;
  isRefreshTokenValid?: boolean;
};
export default function isValidToken({
  accesstoken,
  refreshtoken,
}: isValidTokenProps): ValidTokenResult {
  const currentTime = Math.floor(Date.now() / 1000);

  const result: ValidTokenResult = {};
  try {
    if (accesstoken) {
      const accessTokenPayload = JSON.parse(atob(accesstoken.split(".")[1]));
      result.isAccessTokenValid = accessTokenPayload.exp > currentTime;
    }
    if (refreshtoken) {
      const refreshTokenPayload = JSON.parse(atob(refreshtoken.split(".")[1]));
      result.isRefreshTokenValid = refreshTokenPayload.exp > currentTime;
    }
  } catch (error) {
    console.error("토큰 디코딩 실패", error);
  }
  return result;
}
