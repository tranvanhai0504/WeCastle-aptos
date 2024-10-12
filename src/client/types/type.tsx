export interface User {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  jti: string;
  name: string;
  nbf: number;
  nonce: string;
  picture: string;
}

export type PlayerInfo = {
  address_id: string;
  current_round: number;
  game_finished: boolean;
  hero_owned: string;
  name: string;
  last_claim_time: string;
  round1_finish_time: string;
  round1_play_time: string;
  round2_finish_time: string;
  round2_play_time: string;
  round3_finish_time: string;
  round3_play_time: string;
};

export type LeaderBoardInfo = {
  address_id: string;
  name: string;
  point: number;
};
