#pragma region header
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
#define REP(i, n) for (ll i = 0; i < (ll)(n); i++)
#define REP3(i, m, n) for (ll i = (m); i < (ll)(n); i++)
#define REPA(i, I) for (const auto &i : I)
#pragma endregion
unordered_map<ull, pair<int, int>> memo;
const int depthlimit = 2000000;
const int bit_len = 8;
const int max_score = 30000;
vector<ull> player_msk = {(1ull << (bit_len * 3)) - 1, ((1ull << (bit_len * 3)) - 1) << (3 * bit_len)};
vector<ull> mas_msk(0);
const ull turn_msk = 1ull << (bit_len * 6);
void printvint(vector<int> v)
{
  REP(i, v.size() - 1)
  {
    cout << v[i] << ' ';
  }
  cout << v.back() << endl;
}
tuple<bool, vector<int>> hash_to_board(ull hash)
{
  vector<int> res(8, 0);
  bool is_first = hash & turn_msk;
  REP(i, 6)
  {
    res[i + (i >= 3 ? 1 : 0)] = (hash & mas_msk[i]) >> (i * bit_len);
  }
  return {is_first, res};
}
ull board_to_hash(bool is_first, vector<int> board)
{
  ull res = is_first ? turn_msk : 0;
  REP(i, 6)
  {
    res += ull(board[i + (i >= 3 ? 1 : 0)]) << (i * bit_len);
  }
  return res;
}
bool moves(vector<int> &board, int index)
{
  int remain = board[index];
  board[index] = 0;
  while (remain)
  {
    index = (index + 1) % 8;
    board[index]++;
    remain--;
  }
  return (index + 1) % 4 != 0;
}
pair<int, int> dfs(ull hash, int depth = 0)
{
  if (memo.count(hash))
  {
    return memo[hash];
  }
  if (depth >= depthlimit)
  {
    return make_pair(0, -1);
  }
  REP(i, 2)
  {
    if (!(hash & player_msk[i]))
    {
      memo[hash] = make_pair(max_score * (1 - 2 * i), -1);
      return memo[hash];
    }
  }
  bool is_first;
  vector<int> board;
  tie(is_first, board) = hash_to_board(hash);
  int best_score = -max_score, best_hand = -1;
  REP(i, 3)
  {
    int index = is_first ? i : i + 4;
    if (!board[index])
    {
      continue;
    }
    vector<int> b = board;
    bool change = moves(b, index);
    int score, hand;
    tie(score, hand) = dfs(board_to_hash(is_first ^ change, b), depth + 1);
    if (!is_first)
    {
      score *= -1;
    }
    if (change || abs(score) == max_score)
    {
      int sign = (score > 0) - (score < 0);
      score -= sign;
    }
    if (score > best_score)
    {
      best_score = score;
      best_hand = index;
    }
  }
  if (!is_first)
  {
    best_score *= -1;
  }
  memo[hash] = make_pair(best_score, best_hand);
  return memo[hash];
}
int main()
{
  ull n;
  cout << "Input stones : ";
  cin >> n;
  assert(n * 6 <= 1 << bit_len);
  ull init_board = 0;
  REP(i, 6)
  {
    init_board += n << (bit_len * i);
    mas_msk.push_back(((1ull << bit_len) - 1) << (i * bit_len));
  }
  init_board += turn_msk;
  dfs(init_board);
  // cout << "{" << endl;
  // REPA(i, memo)
  // {
  //   cout << i.first << ": [" << i.second.first << ", " << i.second.second << "]," << endl;
  // }
  // cout << "}" << endl;
  // return 0;
  vector<int> board(8, 0);
  REP(i, 6)
  {
    board[i >= 3 ? i + 1 : i] += n;
  }
  bool is_first = true;
  ull hash;
  int score, best_hand, hand;
  while (true)
  {
    hash = board_to_hash(is_first, board);
    assert(memo.count(hash));
    tie(score, best_hand) = memo[hash];
    cout << "board : ";
    printvint(board);
    // cout << "hash : " << hash << endl;
    if (best_hand == -1)
    {
      cout << (score == max_score ? "first win" : "second win") << endl;
      break;
    }
    cout << (is_first ? "first move" : "second move");
    cout << ", score : " << score;
    cout << ", recommend : " << best_hand << endl;
    while (true)
    {
      cout << "next : ";
      cin >> hand;
      if ((is_first && (hand < 0 || 2 < hand)) || (!is_first && (hand < 4 || 6 < hand)))
      {
        cout << "Error: please input valid number " << (is_first ? "0-2" : "4-6") << endl;
        continue;
      }
      if (!board[hand])
      {
        cout << "Error: Block " << hand << " is empty" << endl;
        continue;
      }
      break;
    }
    bool change = moves(board, hand);
    if (change)
    {
      is_first ^= true;
    }
  }
}
