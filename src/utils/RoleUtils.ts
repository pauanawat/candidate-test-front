import jwtDecode, { JwtPayload } from 'jwt-decode';

type JwtDecode = (token: string) => JwtPayload;
type MyJwtPayload = {
  id: number
}
const isMyJwtPayload = (decoded: any): decoded is MyJwtPayload => {
  return typeof decoded === 'object' && 'id' in decoded;
};

export const getUserIdByToken = (token: string | null): string | null => {
  if (!!token) {
    // Use the custom JwtDecode type for type assertion
    const decodedToken = (jwtDecode as unknown as JwtDecode)(token);
    if (isMyJwtPayload(decodedToken)) {
      console.log(decodedToken.id)
      return decodedToken.id.toString() ?? null
    }
  }
  return null
}