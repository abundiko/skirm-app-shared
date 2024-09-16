# Notion

how notion codes work for programatical calculation

## Parts

every notion code has 3 parts
- left: `H` or `A` (home or away depends on which team is supported)
- center: special character
- right: `H` or `A` (home or away depends on which team is supported)

each part is seperated with an underscore `_`.

## Special characters
- `>` L wins R
- `>num` L scores more than `num` goals
- `>=num` L scores `num` or more goals
- `<num` L scores less than `num` goals
- `<=num` L scores less than or equal to `num` goals
- `=` L draws with R
- `!=` L NOT draw with R
- `=num` L draw with R with EXACTLY `num` goals
- `Enum` Match ends with total of `num` goals
- `!Enum` Match not end with total of `num` goals
- `OT`: Match goes into overtime
- `P`: Match is decided by penalties
- `GLT`: Goal-line technology is used
- `AB`: Match is abandoned
- `BTS`: Both teams to score
- `CS_num_num`: Correct score (e.g., CS_2_1 for 2-1)

## Example codes
- `H_>_A`: home wins away, same as `A_<_H`. opposite of `H_<_A`
- `H_=_A`: draw, same as `A_=_H`. opposite of `H_!=_A`
- `H_=2_A`: math will end 2-2, same as `A_=2_H`. opposite of `H_!=2_A`
- `H_E2_A`: math will end 2 goals in total, same as `A_E2_H`. opposite of `H_!E2_A`
- `H_<=3_A`: home scores less or equal to `3` goals `A_E2_H`.
- `H_>_A`: Home team wins over the away team
- `H_OT_A`: Home team wins in overtime
- `H_P_A`: Home team wins on penalties
- `H_GLT_A`: Home team wins due to goal-line technology
- `AB`: Match is abandoned
- `H_BTS_A`: Both teams score in the match
- `H_CS_2_1_A`: Correct score is 2-1 for the home team

