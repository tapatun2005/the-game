require('gsap');
// require('jquery.nicescroll');
require("nanoscroller");

(function(PxLoader, PxLoaderImage) {
	
	var hands=[{"title":"Royal flush","data":"royal_flush","card_1":"1.svg","card_1_status":"active","card_2":"13.svg","card_2_status":"active","card_3":"12.svg","card_3_status":"active","card_4":"11.svg","card_4_status":"active","card_5":"10.svg","card_5_status":"active","description":"Royal flush is the absolute best possible card combination in poker. It contains five cards of the same suit, in sequence from 10 to Ace. It is an unbeatable hand and you can be sure you win the pot or at least some part of it.\n\nRemember, that all suits are equal in poker games. It may be a situation when two or more players hold a royal flush but is highly unlikely. In this case the pot is split between those two players.\n\nRoyal flush is a kind of straight flush and is considered the most rare poker hand combination. There are only four possible royal flush hands, one for each suit. The chances of you being dealt a royal flush are very minimal, only 0.00015%. However, if you are lucky you can confidently place an all-in with a royal flush. ","possibility":"0.0015%","menu_card_1":"10.svg","menu_card_2":"11.svg","menu_card_3":"12.svg","menu_card_4":"13.svg","menu_card_5":"1.svg"},{"title":"Straight flush","data":"straight_flush","card_1":"5.svg","card_1_status":"active","card_2":"6.svg","card_2_status":"active","card_3":"7.svg","card_3_status":"active","card_4":"8.svg","card_4_status":"active","card_5":"9.svg","card_5_status":"active","description":"Straight flush is the highest of all poker hands. It consists of five cards in sequence, all of the same suit. If there are more than one straight flush at showdown, the one containing the highest top card wins the pot\nBearing in mind that all suits in poker are equal, in an event of multiple players reviling a straight flush with the same cards value the pot is split between them. The ace (A) can be used as both the highest (A - K - Q - J - 10) and the lowest card (5 - 4 - 3 - 2 - A). In the first example, the hand is a royal flush - the best possible five-card combination. The second example shows the lowest possible straight flush.\n\nThere are 40 possible straight flushes, including four royal flushes in poker. The chances of you being dealt a straight flush are pretty slim at just 0.00139%.","possibility":"0.00139%","menu_card_1":"19.svg","menu_card_2":"18.svg","menu_card_3":"17.svg","menu_card_4":"16.svg","menu_card_5":"15.svg"},{"title":"Four of a kind","data":"four_of_kind","card_1":"11.svg","card_1_status":"active","card_2":"24.svg","card_2_status":"active","card_3":"37.svg","card_3_status":"active","card_4":"50.svg","card_4_status":"active","card_5":"17.svg","card_5_status":"passive","description":"Four-of-a-kind or also known as quads is the next highest ranking hand after the starting flush. It consists of any four cards with the same rank and any other card. If there are more than one player with a quads at showdown, the player with the highest four cards wins the pot. \n\nIn poker games with community cards, if two or more players share the same four-of-a-kind, the winner is decided by the bigger fifth card, also known as the ‘kicker’.\n\nThere are 624 possible four-of-a-kind hands. The best one contains four aces, the lowest is made up of 2 - 2 - 2 - 2. The chances of being dealt a quads are also very rare at 0.024%.","possibility":"0.024%","menu_card_1":"13.svg","menu_card_2":"3.svg","menu_card_3":"16.svg","menu_card_4":"29.svg","menu_card_5":"42.svg"},{"title":"Full house","data":"full_house","card_1":"51.svg","card_1_status":"active","card_2":"38.svg","card_2_status":"active","card_3":"25.svg","card_3_status":"active","card_4":"33.svg","card_4_status":"active","card_5":"7.svg","card_5_status":"active","description":"Full house is the next highest ranking hand after four-of-a-kind. It has three matching cards of one rank and two matching cards of a different rank. If there are more that one full houses at the showdown, the player with highest rank of the three cards wins the pot. In poker games with community cards, it is possible that several players share three matching cards from the board. In this case, the player with the higher pair wins the pot. \n\nThere are 3.744 possible combinations of a full house. The highest possible is three aces and two kings (A - A - A - K - K) and the lowest is 2 - 2 - 2 - 3 - 3. The probability of being dealt a full house is 0.1441%.","possibility":"0.1441%","menu_card_1":"38.svg","menu_card_2":"12.svg","menu_card_3":"25.svg","menu_card_4":"43.svg","menu_card_5":"30.svg"},{"title":"Flush","data":"flush","card_1":"39.svg","card_1_status":"active","card_2":"36.svg","card_2_status":"active","card_3":"35.svg","card_3_status":"active","card_4":"31.svg","card_4_status":"active","card_5":"30.svg","card_5_status":"active","description":"Flush is rather strong poker hand. It consists of any five cards of the same suit, but not in sequence. If there are more than one flushes at showdown, the player with the highest top card wins the pot. If both players have the same highest card in a hand, the second highest card is compared, and so on, until a difference is found. If there is no difference between the two hands, the players split the pot. Remember, the suits are equal in poker, so it makes no odds which suit you use to form a hand. \n\nThere are 5.108 possible combinations and chances of being dealt a flush are 0.1965%.","possibility":"0.1965%","menu_card_1":"48.svg","menu_card_2":"47.svg","menu_card_3":"46.svg","menu_card_4":"45.svg","menu_card_5":"44.svg"},{"title":"Straight","data":"straight","card_1":"46.svg","card_1_status":"active","card_2":"45.svg","card_2_status":"active","card_3":"31.svg","card_3_status":"active","card_4":"17.svg","card_4_status":"active","card_5":"3.svg","card_5_status":"active","description":"Straight is a poker hand that contains any five connected cards in sequence with at least two different suits. If there are two or more straight hands at showdown, the player with the highest top card wins the pot. If the highest card in all the straights is of the same rank, the pot is split among the players. All suits are equal in poker, they can not be used to determine a winner. \n\nThe ace in a straight may be used as both a high (A - K - Q - J - 10) and low (5 - 4 - 3 - 2 - A) card. The first example, known as ‘Broadway’’, shows the highest ranking straight. In contract to the second example called the ‘wheel’ in poker terms, which is the lowest possible straight. \n\nThere are 10.240 possible straight combinations, making it a 0.39% chance of being dealt one.","possibility":"0.39%","menu_card_1":"23.svg","menu_card_2":"22.svg","menu_card_3":"21.svg","menu_card_4":"20.svg","menu_card_5":"19.svg"},{"title":"Three of a kind","data":"three_of_kind","card_1":"27.svg","card_1_status":"active","card_2":"14.svg","card_2_status":"active","card_3":"1.svg","card_3_status":"active","card_4":"17.svg","card_4_status":"passive","card_5":"2.svg","card_5_status":"passive","description":"Three-of-a-kind is the next ranking hand after staring. It consists of any three cards of the same rank and any two other cards. If there are two or more players with a three-of-a-kind at showdown, the highest fourth card, also known as the ‘kicker’, decided who the winner is. If the fourth card did not determine the winner, the fifth card is considered. In a situation where all revealed three-of-a-kind hands are equal, the pot is split divided among the winning players. \n\nIn Texas Hold’em and other flop games, three-of-a-kind is called a ‘set’. It is when a player has a pair on his private (hole) cards and one card of a matching rank on the board, for example, 5 - 5 on your hole cards and 5 on the board. Another possible type of three-of-a-kind is ‘trips’. it is made up of a matching pair on the board and one hole card, for example, 5 - 5 - 4 on the board and 5 on your hole cards.\n\nThere are 54.912 possible three-of-a-kind hands. The likelihood of being dealt such a combination is 2.1128%.","possibility":"2.1128%","menu_card_1":"37.svg","menu_card_2":"9.svg","menu_card_3":"20.svg","menu_card_4":"33.svg","menu_card_5":"46.svg"},{"title":"Two pairs","data":"two_pairs","card_1":"11.svg","card_1_status":"active","card_2":"24.svg","card_2_status":"active","card_3":"8.svg","card_3_status":"active","card_4":"21.svg","card_4_status":"active","card_5":"45.svg","card_5_status":"passive","description":"Two pair speaks for itself. It is basically a poker hand made up of two pairs of a different rank and any other card. If there are several players with a two pair, they are compared by the highest pair in each hand. The best two pair wins the pot. If the highest pairs are equal, the second pair determine the winner. If none of the pairs can be used to determine the winner, the player with the highest fifth card, also called the ‘kicker’, gets all the money from the pot. It is also possible that two players have absolutely equal two pairs, in that case the pot is split between them. \n\nThere are 123.552 possible two pair hands, making it one of the most winning hands. This is  4.7539% chances of being dealt one.","possibility":"4.7539%","menu_card_1":"4.svg","menu_card_2":"38.svg","menu_card_3":"12.svg","menu_card_4":"21.svg","menu_card_5":"34.svg"},{"title":"Pair","data":"pair","card_1":"12.svg","card_1_status":"active","card_2":"51.svg","card_2_status":"active","card_3":"3.svg","card_3_status":"passive","card_4":"32.svg","card_4_status":"passive","card_5":"18.svg","card_5_status":"passive","description":"One pair is a poker hand rank that consists of two cards of the same rank and any three other cards. If there are two or more players with one pair, a player with the highest card value pair wins the pot. If a few players have the same pair, other three cards, or the ‘kickers’, are used to determine the winner. The player with the highest non-pair card wins all the money in the pot. In a situation when several players have the pair and three cards of the same value, the pot is split among them. \n\nThere are 1.098.240 possible one pair hands. That makes the chances of being dealt one very high at 42.2569%.","possibility":"42.2569%","menu_card_1":"46.svg","menu_card_2":"30.svg","menu_card_3":"1.svg","menu_card_4":"35.svg","menu_card_5":"9.svg"},{"title":"High card","data":"high_card","card_1":"1.svg","card_1_status":"active","card_2":"22.svg","card_2_status":"passive","card_3":"41.svg","card_3_status":"passive","card_4":"33.svg","card_4_status":"passive","card_5":"3.svg","card_5_status":"passive","description":"No pair is the lowest possible hand that contains any cards.  If a few players play no pair at showdown, the highest top card determines the winner. If all top cards are equal in value, the next highest ranking card from each hand is compared, and so on until a difference is found. If players have absolutely the same no pairs, the pot is split among them. It is not the end of the world if you get a no pair, as here is still a chance to win money form the pot if all the other players fold or have the same ranking hand at showdown.\n\nThere are 2.598.960 possible five card combinations. The chances of being dealt a no pair 50.1177%.","possibility":"50.1177%","menu_card_1":"41.svg","menu_card_2":"3.svg","menu_card_3":"31.svg","menu_card_4":"8.svg","menu_card_5":"23.svg"}];var main_cards=[{"stage":"initial","main_card_1_top":"-50","main_card_1_left":"-50","main_card_2_top":"-50","main_card_2_left":"-50","main_card_3_top":"-50","main_card_3_left":"-50","main_card_4_top":"-50","main_card_4_left":"-50","main_card_5_top":"-50","main_card_5_left":"-50"},{"stage":"options","main_card_1_top":"-50","main_card_1_left":"-278","main_card_2_top":"-50","main_card_2_left":"-164","main_card_3_top":"-50","main_card_3_left":"-50","main_card_4_top":"-50","main_card_4_left":"64","main_card_5_top":"-50","main_card_5_left":"179"}];var texas_cards=[{"step_id":"texas_holdem_deal_0","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_1","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_2","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_3","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_4","card_1_left":"22","card_1_top":"13","card_1_rotate":"0","card_1_class":"passive","card_2_left":"35","card_2_top":"13","card_2_rotate":"0","card_2_class":"passive","card_3_left":"69","card_3_top":"13","card_3_rotate":"0","card_3_class":"passive","card_4_left":"82","card_4_top":"13","card_4_rotate":"0","card_4_class":"passive","card_5_left":"90","card_5_top":"48","card_5_rotate":"90","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_0","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_1","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_2","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_3","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_4","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_5","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_pre_flop_6","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_flop_0","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_flop_1","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_flop_2","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_flop_3","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"}];

    var timeline = new TimelineLite();

    var baseDomain = "paradise-moment.indino.co.uk";

    var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
        animationEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
    var loader;

    function preloader() {
        loader = new PxLoader();
        $('img').each(function() {
            var src = $(this).prop('src');
            loader.add(new PxLoaderImage(src));
        });


        loader.addProgressListener(function(e) {
            var percentage = parseInt((e.completedCount/e.totalCount)*100);
            // $('#loader span').text(percentage+'%');
            if (percentage === 100) {
                setTimeout (function(){
                    init();
                }, 0);
            }
            console.log(percentage);
        });

        loader.start();
    }

    function init() {
        var data = "initial";
        loaded();
        mainCardPostion(data);
        $('.js-start').on('click', start);
        $('.js-back').on('click', goBack);
        $('.js-main-card').on('click', showOption);
    //menu
        $('.js-open-menu').on('click', showMenu);
        $('.js-btn-close-menu').on('click', closeMenu);
        
        
        $('.js-show-hand').on('click', showHand);
        $('.js-next-intro').on('click', showNextStepIntro);
        $('.js-prev-intro').on('click', showPrevStepIntro);
        $('.js-next-rules').on('click', showNextStepRules);
        $('.js-prev-rules').on('click', showPrevStepRules);
        $('.js-next-tips').on('click', showNextStepTips);
        $('.js-prev-tips').on('click', showPrevStepTips);

        $('.js-next-hand').on('click', showNextHand);
        $('.js-prev-hand').on('click', showPrevHand);


        $('.js-tab-1').on('click', showTabSectionIntro);
        $('.js-tab-2').on('click', showTabSectionRules);
        $('.js-tab-3').on('click', showTabSectionTips);
        $('.js-stage-nav').on('click', showStage);
        $('.js-step-nav').on('click', showStep);
        $('.js-table-step').on('click', showTableStep);

        $(".nano, .nano-hands-menu").nanoScroller();
    }

//START LOADING

    function loaded() {
        mainCardHoverOn();
        menuCardHoverOn();
    }

//END

//HOVER CARD IN MENU 
	function menuCardHoverOn() {
		 $(".js-show-hand").on({
            mouseenter: hoverInMenuCard,
            mouseleave: hoverOutMenuCard
        });
	}

	function menuCardHoverOff() {
		 $(".js-show-hand").on({
            mouseenter: hoverInMenuCard,
            mouseleave: hoverOutMenuCard
        });
	}

	function hoverInMenuCard(e) {
       var current = $(e.currentTarget);
       for (var i = 1; i < 5; i++) {
            var card = $(current).find('.js-menu-card-'+i);
        	TweenLite.to(card, 0.3, {left:"-11"*i, ease:Power2.easeInOut}, 0);
       		TweenLite.to(current, 0.1, {x:"10", ease:Power0.easeNone}, 0);
        }
    }
    function hoverOutMenuCard(e) {
         for (var i = 1; i < 5; i++) {
            var card = $('.js-menu-card-'+i);
        	TweenLite.to(".js-menu-card-"+i, 0.3, {left:"0", ease:Power2.easeInOut});
        	TweenLite.to(".js-show-hand", 0.1, {x:"0", ease:Power0.easeNone});
        }
    }


//HOVER CARD
    function mainCardHoverOn(){
        $(".js-main-card").on({
            mouseenter: hoverInMainCard,
            mouseleave: hoverOutMainCard
        });
    }

    function mainCardHoverOff() {
        $(".js-main-card").off({
            mouseenter: hoverInMainCard,
            mouseleave: hoverOutMainCard
        });
    }

    function hoverInMainCard() {
        var glow = $(this).find('.js-glow');
        TweenLite.to(".js-main-card", 0.5, {scale:"0.9", opacity: "0.75", ease:Power2.easeInOut});
        TweenLite.to(this, 0.5, {scale:"1.1", opacity: "1", ease:Power2.easeInOut});
        TweenLite.to(glow, 0.5, {opacity:".75", ease:Power2.easeInOut});
    }
    function hoverOutMainCard(e) {
        if (!$(".js-main-card").hasClass('wrapped')) {
            scaleToInitial();
        } else {
            showOption(e);
        }
    }
//END


//OPTION LIST
    function toInitialMainCards() {
        // var rotateElem = $(".main-card-wrap");
        var faceup = $('.js-faceup');
        var facedown = $('.js-facedown');
        rotateToFaceDown(faceup, facedown);
        setTimeout (function(){
            scaleToInitial();
        },1000);
    }

//START function
    function start(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var data = $(current).data('main_cards');
        toInitialMainCards();
        mainCardPostion(data);
        moveMainCardsCenter();
        removezIndex();
        current.addClass('hide');
        TweenMax.to(".js-start", .5, {opacity: "0", ease:Power2.easeInOut});
        $('.nav__flex-top').addClass('show');
        TweenMax.to(".nav__flex-top", .5, {opacity: "1", ease:Power2.easeInOut});
    }

    function goBack(e) {
        e.preventDefault();
        mainCardHoverOn();
        closeMenu();
        hideHandDesc();
        var current = $(e.currentTarget);
        var data = $(current).data('main_cards');
        toInitialMainCards();
        removeBackButton();
        $('.js-main-card').removeClass('wrapped');
        TweenLite.to(".js-main-card", 1.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
        setTimeout(function(){
            mainCardPostion(data);
            zoomInMainCards();
            moveMainCardsCenter();
        },750);
        setTimeout(function(){
            removezIndex();
        }, 2000);
        $('.js-game.active').removeClass('active');
        hideSection();
        hideTable();
        hideTabs();
        hideNavLine();

        $('.js-table-stage').removeClass('show');
        $('.js-table-step').removeClass('active');
        $('.js-table-step').removeClass('focus');
        TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
    }
    
    function removezIndex() {
        $('.js-main-card').removeClass('index');
    }
//END


//SHOW OPTION
    function showOption(e) {
        e.preventDefault();
        mainCardHoverOff();
        var current = $(e.currentTarget);
        var currentGameData = $(current).data("main_card");
        var currentGame = $('#'+currentGameData);

        var data = "initial";
        // var rotateElem = $(current).find('.main-card-wrap');
        mainCardPostion(data);
        moveMainCardsLeft();
        current.addClass('index');
        $(".js-main-card").addClass('wrapped');
        TweenLite.to(".js-main-card", 1, {scale:"0.85", ease:Power2.easeInOut});
        TweenLite.to(current, 1, {scale:"1.3", ease:Power2.easeInOut});
        // rotateToFaceUp(rotateElem);

        var faceup = $(current).find('.js-faceup');
        var facedown = $(current).find('.js-facedown');

        rotateToFaceUp(facedown, faceup);
        removeActiveMainCards();
        showBackButton();
//show game content
        $('#' + currentGameData).addClass('active');

        showIntro();
        showTabs();
        // firstActiveTab();

    //text animation
    
        return false;
    }

    function firstActiveTab() {
    	var firstTab = $('.js-game.active').find('.js-tab:first-child');
    	firstTab.addClass('active');
    }

//MAIN CARD POSITIONS
    function mainCardPostion(data) {
        var main_card = main_cards.filter(function ( main_card ) {
            return main_card.stage === data;
        })[0];

        for (var i = 1; i < 6; i++) {
            var left = main_card["main_card_"+i+"_left"]+"%";
            var top = main_card["main_card_"+i+"_top"]+"%";
            if ( data == "options" ) {
            	TweenLite.to('.main_card_' + i, 1.5, {x:left, y: top, ease:Power2.easeInOut, onComplete: showTitle});
            } else {
        		TweenLite.to('.js-card-title', .5, {bottom:"90%", opacity:"0"});    	
            	TweenLite.to('.main_card_' + i, 1.5, {x:left, y: top, ease:Power2.easeInOut});
            }
        }
    }

    //add title to the cards 
    function showTitle() {
     	TweenMax.fromTo('.js-card-title', .5, {bottom:"90%", opacity:"0"}, {bottom:"105%",opacity:"1"});
     	$('.main-cards').addClass('active');
    }
//END

// MAIN CARDS POSITION FOR 

	function mainCardPostionHand(data) {
        var main_card = main_cards.filter(function ( main_card ) {
            return main_card.stage === data;
        })[0];

        for (var i = 1; i < 6; i++) {
            var left = main_card["main_card_"+i+"_left"]+"%";
            var top = main_card["main_card_"+i+"_top"]+"%";       
        	TweenLite.to('.js-card-title', .5, {bottom:"90%", opacity:"0"});
            TweenLite.to('.main_card_' + i, 1.5, {x:left, y: top, ease:Power2.easeInOut});
        }
    }


//POKER HANDS MENU

    //show menu
    function showMenu(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var parent = $(current).closest('.nav__item');
        var bgTop = $(parent).find('.js-top-bg');
        var close = $(current).find('.btn--close');
        var list = $(parent).find('.nav__list');
        // var backButton = $(parent).find('.btn--back');
        var title = $(parent).find('.js-menu-title');
        TweenLite.to(bgTop, 1, {width: "270px", ease:Power2.easeInOut});
        TweenLite.to(title, 1, {color: "#ffffff", ease:Power2.easeInOut});
        TweenLite.to(parent, 1, {width:"300px", height: "100%", background: "rgba(8,40,71,1)", ease:Power2.easeInOut});
        setTimeout(function(){
            TweenLite.to(close, .1, {left: "0%", ease:Power1.easeInOut});
            TweenLite.to(list, 1, {opacity: "1", ease:Power2.easeInOut});
            list.addClass('show');
        }, 1000);
    }

    //close menu
    function closeMenu() {
        TweenLite.to(".btn--close__left", .1, {left: "-100%", ease:Power1.easeInOut});
        TweenLite.to(".btn--close__right", .1, {left: "100%", ease:Power1.easeInOut});
        TweenLite.to(".nav__list", .5, {opacity: "0", ease:Power2.easeInOut});
        $('.nav__list').removeClass('show');
        setTimeout(function(){
            TweenLite.to(".nav__item--menu", 1, {width:"65px", height: "30px", background: "rgba(8,40,71,0)", ease:Power2.easeInOut});
            TweenLite.to(".nav__item--hand", 1, {width:"85px", height: "30px", background: "rgba(8,40,71,0)", ease:Power2.easeInOut});
            TweenLite.to(".js-top-bg", 1, {width: "0", ease:Power2.easeInOut});
            TweenLite.to(".js-menu-title", 1, {color: "#016fde", ease:Power2.easeInOut});
        }, 500);
        return false;
    }
    
    //show hand
    function showHand(e){
        e.preventDefault();
        var data = "options";
        var faceup = $('.js-faceup');
        var facedown = $('.js-facedown');
        var image = $(e.currentTarget).data('hand');
        var parent = $(e.currentTarget).closest('.nav__item');
        var backButton = $(parent).find('.btn--back');

    //show hand description
    	// $('.js-hand-description').removeClass('active');
    	var handDesc = $('.'+image);
    	handDesc.addClass('active').siblings('.js-hand-description').removeClass('active');
    	TweenLite.to(".js-hand-description", .5, {opacity:"0", ease:Power0.easeInOut});
    	TweenMax.fromTo('.js-hand-title', .3, {x: "0%"}, {x: "30%"});
    	setTimeout(function(){
 			TweenLite.to(handDesc, .5, {opacity:"1", ease:Power0.easeInOut});
 			TweenMax.fromTo(handDesc, .5, {x:"-75%", y:"-50%"}, {x:"-50%",y:"-50%"});
    		var title = $(handDesc).find('.js-hand-title');
    		TweenMax.fromTo(title, .3, {x: "-30%"}, {x: "0%"});
    	},1000);
    //move title

        mainCardHoverOff();
        removeActiveMainCards();
        scaleToInitial();
        moveMainCardsLeftBorder();
        zoomOutMainCards();
        mainCardPostionHand(data);
        closeMenu(e);
        removeBackButton();
        // TweenLite.to(rotateElem, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut, onComplete:imagePokerHands, onCompleteParams: [image]}, .1);
        TweenMax.staggerTo(faceup, 1, {rotationY: "180", scale: "1", ease:Power2.easeInOut});
        TweenMax.staggerTo(facedown, 1, {rotationY: "0", scale: "1", ease:Power2.easeInOut, onComplete:imagePokerHands, onCompleteParams: [image]});
        backButton.addClass('show');
        TweenLite.to(backButton, .3, {opacity:"1", ease:Power0.easeInOut});
        return false;
    }

    //SHOW NEXR HAND
	function showNextHand(e){
		e.preventDefault();
		var current = $(e.currentTarget);
		var activeHand = $(current).closest('.js-hand-description');
		var activeTitle = $(activeHand).find('.js-hand-title');
		var nextHand = $(activeHand).next('.js-hand-description');
		// var rotateElem = $('.main-card-wrap');
		var faceup = $('.js-faceup');
        var facedown = $('.js-facedown');

		var firstHand = $('.js-hand-description').first();
		var image = $(nextHand).data('image') || $(firstHand).data('image');

		activeHand.removeClass('active');
		TweenLite.to(activeHand, .5, {opacity:"0", ease:Power0.easeInOut});
		TweenMax.fromTo(activeHand, .5, {x:"-50%", y:"-50%"}, {x:"-25%",y:"-50%"});
		TweenMax.fromTo(activeTitle, .5, {x: "0%"}, {x: "30%"});

		mainCardHoverOff();
        removeActiveMainCards();
        scaleToInitial();

		if (nextHand.length) {
			TweenLite.to(faceup, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut});
			TweenLite.to(facedown, 1, {rotationY:"0", scale: "1", ease:Power2.easeInOut, onComplete:completeNextHand, onCompleteParams: [image, nextHand]});
		} else {
			TweenLite.to(faceup, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut});
			TweenLite.to(facedown, 1, {rotationY:"0", scale: "1", ease:Power2.easeInOut, onComplete:completeNextHand, onCompleteParams: [image, firstHand]});
		}
	}

	function completeNextHand(image, nextHand, firstHand){
		imagePokerHands(image);
		var title = $(nextHand).find('.js-hand-title') || $(firstHand).find('.js-hand-title');
		if (nextHand.length){
			TweenLite.to(nextHand, 1, {opacity:"1", ease:Power0.easeInOut});
			TweenMax.fromTo(nextHand, .5, {x:"-75%", y:"-50%"}, {x:"-50%",y:"-50%"});
    		TweenMax.fromTo(title, .5, {x: "-30%"}, {x: "0%"});

			setTimeout(function(){
				nextHand.addClass('active');
			},500);
		} else {
			firstHand.addClass('active');
			TweenLite.to(firstHand, 1, {opacity:"1", ease:Power0.easeInOut});
			TweenMax.fromTo(firstHand, .5, {x:"-75%", y:"-50%"}, {x:"-50%",y:"-50%"});
			TweenMax.fromTo(title, .5, {x: "-30%"}, {x: "0%"});
		}
	}


	function showPrevHand(e){
		e.preventDefault();
		var current = $(e.currentTarget);
		var activeHand = $(current).closest('.js-hand-description');
		var prevHand = $(activeHand).prev('.js-hand-description');
		// var rotateElem = $('.main-card-wrap');

		var faceup = $('.js-faceup');
        var facedown = $('.js-facedown');

		var lastHand = $('.js-hand-description').last();
		var image = $(prevHand).data('image') || $(lastHand).data('image');
		var activeTitle = $(activeHand).find('.js-hand-title');

		activeHand.removeClass('active');
		TweenLite.to(activeHand, .5, {opacity:"0", ease:Power0.easeInOut});
		TweenMax.fromTo(activeHand, .5, {x:"-50%", y:"-50%"}, {x:"-75%",y:"-50%"});
		TweenMax.fromTo(activeTitle, .5, {x: "0%"}, {x: "-30%"});

		mainCardHoverOff();
        removeActiveMainCards();
        scaleToInitial();

		if (prevHand.length) {
			TweenLite.to(faceup, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut});
			TweenLite.to(facedown, 1, {rotationY:"0", scale: "1", ease:Power2.easeInOut, onComplete:completeNextHand, onCompleteParams: [image, prevHand]});
		} else {
			TweenLite.to(faceup, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut});
			TweenLite.to(facedown, 1, {rotationY:"0", scale: "1", ease:Power2.easeInOut, onComplete:completeNextHand, onCompleteParams: [image, lastHand]});
		}
	}

	function completePrevHand(image, prevHand, lastHand){
		imagePokerHands(image);
		var title = $(prevHand).find('.js-hand-title') || $(firstHand).find('.js-hand-title');
		if (prevHand.length){
			TweenLite.to(prevHand, 1, {opacity:"1", ease:Power0.easeInOut});
			TweenMax.fromTo(prevHand, .5, {x:"-25%", y:"-50%"}, {x:"-50%",y:"-50%"});
			TweenMax.fromTo(title, .5, {x: "30%"}, {x: "0%"});
			setTimeout(function(){
				prevHand.addClass('active');
			},500);
		} else {
			lastHand.addClass('active');
			TweenLite.to(lastHand, 1, {opacity:"1", ease:Power0.easeInOut});
			TweenMax.fromTo(lastHand, .5, {x:"-25%", y:"-50%"}, {x:"-50%",y:"-50%"});
			TweenMax.fromTo(title, .5, {x: "30%"}, {x: "0%"});
		}
	}


    function hideHandDesc(){
    	$('.js-hand-description').removeClass('active');
    	TweenLite.to('.js-hand-description', .5, {opacity:"0", ease:Power0.easeInOut});
    }

    //replace images
	function imagePokerHands(image) {

		var hand = hands.filter(function ( hand ) {
            return hand.data === image;
        })[0];

    	removeClassesMainCard();
		
		for (var i = 1; i < 6; i++) {
			var image = "images/cards_numbers/" + hand['card_'+i];
			var status = hand["card_" + i + "_status"];
			var cardClass = $('.main_card_' + i);

			$('.main-card__faceup-' + i ).attr('src', image);
			cardClass.addClass(status);
		}

		rotateOneByOneAndScale();
	}

	//remove classes on the main cards 
	function removeClassesMainCard(){
		$(".js-main-card").removeClass('active');
        $(".js-main-card").removeClass('passive');
	}


//SHOW TABS FOR THR GAME

    function showTabs(){
        var activeGame = $('.js-game.active');
        var tabs = $(activeGame).find('.js-tabs');
        TweenLite.to(tabs, .3, {opacity:"1", ease:Power0.easeInOut});
    }

    function hideTabs(){
        TweenLite.to(".js-tabs", .3, {opacity:"0", ease:Power0.easeInOut});
    }

    function showTabSectionIntro(e) {
        // var current = $(e.currentTarget);
        // current.addClass('non-active').siblings('.js-tab').removeClass('non-active');
        hideSection();
        showIntro();
        hideTable();
    }
    function showTabSectionRules(e) {
        hideSection();
        showRules();
        showTable();

    }
    function showTabSectionTips(e) {
        hideSection();
        showTips();
        hideTable();
    }

//SHOW TABLE
    function showTable(){
        var faceup = $(".js-faceup");
        var facedown = $(".js-facedown");
        TweenLite.to(facedown, 1, {rotationY:"0", scale: "1", ease:Power2.easeInOut});
        TweenLite.to(faceup, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut, onComplete:showTable2});
    }
    function showTable2(){
        TweenLite.to(".table", 1, {opacity:"1", ease:Power0.easeInOut});
    }

    function hideTable() {
        TweenLite.to(".table", 1, {opacity:"0", ease:Power0.easeInOut});
    }

//SHOW SECTIONS INTROOOOO!!!!!

    function showIntro() {
        var activeGame = $('.js-game.active');
        var section = $(activeGame).find('.js-section-intro');
        var firstStage = $(section).find('.js-stage:first');
        var firstStep = $(firstStage).find('.js-step:first-child');
        
        section.addClass('active');
        firstStage.addClass('active');
        firstStep.addClass('active');
        
        TweenLite.to(section, 1, {opacity:"1", ease:Power2.easeInOut});

     //animate text

     	TweenLite.fromTo(firstStage, 1, {opacity:"0", x:"-75%", y: "-50%"},{opacity:"1", x:"-50%", y:"-50%", ease:Power2.easeInOut});
     	var firstStageTitle = $(firstStage).find('.js-stage-description');
     	TweenLite.fromTo(firstStageTitle, 1, {x:"-50%"},{x:"0%", ease:Power2.easeInOut});
     	TweenLite.to(firstStep, 0, {x:"0%", opacity:"1"});
    // hide prev first
        
    }


//next prev step
    
    function showNextStepIntro(e){
       e.preventDefault();
       var current = $(e.currentTarget);
       var stage = $(current).closest('.js-stage');
       var activeStep = $(stage).find('.js-step.active');
       var nextStep = $(activeStep).next('.js-step');

       if (nextStep.length) {
            activeStep.removeClass('active');
            nextStep.show().addClass('active');
            
            TweenLite.fromTo(nextStep, .3, {scale:"0.75", opacity:"0", x:"0%"},{scale:"1", opacity:"1", x:"0%", ease:Power0.easeInOut});
            TweenLite.fromTo(activeStep, .3, {opacity:"1", x:"0%"}, {x:"100%", opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});

       } else {
            hideSection();
            showRules();
            showTable();
       }
    }

     function showPrevStepIntro(e){
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var prevStep = $(activeStep).prev('.js-step');

        if (prevStep.length) {
            activeStep.removeClass('active');
            prevStep.show().addClass('active');
            TweenLite.fromTo(activeStep, .3, {opacity:"1", scale:"1"}, {opacity:"0", scale:"0.75",ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.fromTo(prevStep, .3,{opacity:"0", x:"100%"}, {opacity:"1", x:"0%", ease:Power0.easeInOut});

        } else {
            alert("None");
        }
    }


//SHOW RULESSSSSS ................
    
    function showRules(){
        var activeGame = $('.js-game.active');
        var section = $(activeGame).find('.js-section-rules');
        var firstStage = $(section).find(".js-stage:first-child");
        var firstStep = $(firstStage).find('.js-step:first-child');
        var stageNavs = $(section).find('.js-stages');
        var firstStageNav = $(stageNavs).find('.js-stage-nav:first-child');

  //animation for stage items on navigation
  		var stageNavItems = $(section).find('.js-stage-nav');
  		var stageNavLine = $(section).find(".js-stage-initial-line");
  		TweenLite.fromTo(stageNavLine, 1.75, {height:"0"}, {height: "100%", ease:Power2.easeInOut});
  		TweenMax.staggerFromTo(stageNavItems, 1, {opacity: "0"}, {opacity: "1", ease:Power2.easeInOut},.13);


        section.addClass('active');
        firstStage.addClass('active');
        firstStep.show().addClass('active');

//right navigation
        firstStageNav.addClass('active');

        TweenLite.to(section, 1, {opacity:"1", ease:Power2.easeInOut});

    //animate text
     	TweenLite.fromTo(firstStage, 1, {opacity:"0", x:"-75%", y: "-50%"},{opacity:"1", x:"-50%", y:"-50%", ease:Power2.easeInOut});
     	var firstStageTitle = $(firstStage).find('.js-stage-description');
     	TweenLite.fromTo(firstStageTitle, 1, {x:"-50%"},{x:"0%", ease:Power2.easeInOut});
     	TweenLite.to(firstStep, 0, {x:"0%", opacity:"1"});

  //ANIMATION FOR CARDS
        var step_id = $(firstStep).data('position');
        positions(step_id);

    // POINTS ON THE TABLE
        var firstStageData = $(firstStage).data('nav');
        var table_stage = $('.table__stages').find("[data-stage=" + firstStageData + "]");

        table_stage.addClass('show');
        TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});
    }

    function showNextStepRules(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var nextStep = $(activeStep).next('.js-step');
        var nextStage = $(stage).next('.js-stage');
        var nextStageStep = $(nextStage).find('.js-step:first-child');
        //for right nav
        var section = $(current).closest('.js-section');
        var stageNavs = $(section).find('.js-stages');
        var stepNavs = $(stage).find('.js-steps');

        if (nextStep.length) {
        //top steps navigations 
            var stepDataNav = $(nextStep).data('nav');
            var stepNav = $(stepNavs).find("[data-step=" + stepDataNav + "]");
            var upNavs = $(stepNav).prevAll('.js-step-nav');

        //top nav
            stepNav.addClass("active");
            upNavs.addClass('focus');
            upNavs.removeClass('active');


            activeStep.removeClass('active');
            nextStep.addClass('active');

        //add classes to table points
            var tableNav = $('.table__stage.show').find("[data-step=" + stepDataNav + "]");
            var tableNavUp = $(tableNav).prevAll('.js-table-step');
            var tableNavDown = $(tableNav).nextAll('.js-table-step');
            tableNavUp.removeClass('active');
            tableNavUp.addClass('focus');
            tableNav.addClass('active');
            tableNavDown.removeClass('active');
            tableNavDown.removeClass('focus');

       	//animation for the text
            TweenLite.fromTo(nextStep, .3, {scale:"0.75", opacity:"0", x:"0%"},{scale:"1", opacity:"1", x:"0%", ease:Power0.easeInOut});
            TweenLite.fromTo(activeStep, .3, {opacity:"1", x:"0%"}, {x:"100%", opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});


        //animate progress line 

    		drawStepLine();

        //ANIMATION FOR CARDS
            var step_id = $(nextStep).data('position');
            positions(step_id);

       } else {
            if (nextStage.length ) {
            //navigation right
                var stageDataNav = $(nextStage).data('nav');
                var stageNav = $(stageNavs).find("[data-stage=" + stageDataNav + "]");
                var upNavs = $(stageNav).prevAll('.js-stage-nav');

            //nav right
                stageNav.addClass('active');
                upNavs.removeClass('active');
                upNavs.addClass('focus');

                stage.removeClass('active');
                nextStage.addClass('active');
                nextStageStep.addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                // TweenLite.to(nextStage, 1, {opacity:"1", ease:Power2.easeInOut});
                // TweenLite.to(nextStageStep, 1, {opacity:"1", ease:Power2.easeInOut});


            //animation next stage
            	TweenLite.fromTo(stage, .75, {opacity:"1", x:"-50%", y:"-50%"},{opacity:"0", x:"0%", y:"-50%", ease:Power2.easeInOut});
            	var stageTitle = $(stage).find('.js-stage-description');
            	TweenLite.fromTo(stageTitle, .75, {x:"0%"},{x:"50%", ease:Power2.easeInOut});

                TweenLite.fromTo(nextStage, 1, {opacity:"0", x:"-75%", y: "-50%"},{opacity:"1", x:"-50%", y:"-50%", ease:Power2.easeInOut});
     			var nextStageTitle = $(nextStage).find('.js-stage-description');
     			TweenLite.fromTo(nextStageTitle, 1, {x:"-50%"},{x:"0%", ease:Power2.easeInOut});
     			TweenLite.to(nextStageStep, 0, {x:"0%", opacity:"1"});

            //remove previous stage classes
                var stepNav = $(stage).find('.js-step-nav');
                stepNav.removeClass('active');
                stepNav.removeClass('focus');
                activeStep.removeClass('active');
                TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});


            // POINTS ON THE TABLE
               
                var table_stage = $('.table__stages').find("[data-stage=" + stageDataNav + "]");
                table_stage.addClass('show');
                TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});

            //ANIMATION FOR CARDS
                var step_id = $(nextStageStep).data('position');
                positions(step_id);
                drawNavLine();
            } else {
                hideSection();
                showTips();
            }
       }
    }

    function showPrevStepRules(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var prevStep = $(activeStep).prev('.js-step');
        var prevStage = $(stage).prev('.js-stage');

        //for right nav
        var section = $(current).closest('.js-section');
        var stageNavs = $(section).find('.js-stages');
        //for the top nav
        var stepNavs = $(stage).find('.js-steps');

         if (prevStep.length) {
        //top steps navigations 
            var stepDataNav = $(prevStep).data('nav');
            var stepNav = $(stepNavs).find("[data-step=" + stepDataNav + "]");
            var upNavs = $(stepNav).prevAll('.js-step-nav');
            var downNavs = $(stepNav).nextAll('.js-step-nav');

        //top nav
            if (stepNav.length) {
                stepNav.addClass("active");
                upNavs.addClass('focus');
                upNavs.removeClass('active');
                downNavs.removeClass('active');
                downNavs.removeClass('focus');
            } else {
                $('.js-step-nav').removeClass('active');
                $('.js-step-nav').removeClass('focus');
                $('.js-table-step').removeClass('active');
                $('.js-table-step').removeClass('focus');
            }

            activeStep.removeClass('active');
            prevStep.addClass('active');

            TweenLite.fromTo(activeStep, .3, {opacity:"1", scale:"1"}, {opacity:"0", scale:"0.75",ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.fromTo(prevStep, .3,{opacity:"0", x:"100%"}, {opacity:"1", x:"0%", ease:Power0.easeInOut});


        //add classes to table points
            var tableNav = $('.table__stage.show').find("[data-step=" + stepDataNav + "]");
            var tableNavUp = $(tableNav).prevAll('.js-table-step');
            var tableNavDown = $(tableNav).nextAll('.js-table-step');
            tableNavUp.removeClass('active');
            tableNavUp.addClass('focus');
            tableNav.addClass('active');
            tableNavDown.removeClass('active');
            tableNavDown.removeClass('focus');

         //animate progress line 

    		drawStepLine();

        //ANIMATION FOR CARDS
            var step_id = $(prevStep).data('position');
            positions(step_id);

         } else {
            if (prevStage.length) {
                var prevStageStep = $(prevStage).find('.js-step:last-child');
                var prevStageStepData = $(prevStageStep).data('nav');
                var prevStepNavs = $(prevStage).find('.js-steps');
                var stepNav = $(prevStepNavs).find("[data-step=" + prevStageStepData + "]");
                var upStepNavs = $(stepNav).prevAll('.js-step-nav');

            //navigation right
                var stageDataNav = $(prevStage).data('nav');
                var stageNav = $(stageNavs).find("[data-stage=" + stageDataNav + "]");
                var upStageNavs = $(stageNav).prevAll('.js-stage-nav');
                var downStageNavs = $(stageNav).nextAll('.js-stage-nav');

            //steps from previous stage
                var prevSteps = $(prevStage).find('.js-step-nav');
                prevSteps.removeClass('active');
                prevSteps.removeClass('focus');

            //add classes to step in next stage
                stepNav.addClass('active');
                stepNav.addClass('focus');
                upStepNavs.addClass('focus');


            //nav right
                stageNav.addClass('active');
                upStageNavs.removeClass('active');
                upStageNavs.addClass('focus');
                downStageNavs.removeClass('active');
                downStageNavs.removeClass('focus');

                stage.removeClass('active');
                activeStep.removeClass('active');
                prevStage.addClass('active');
                prevStageStep.addClass('active');


            //animation next stage
            	TweenLite.fromTo(stage, .75, {opacity:"1", x:"-50%", y:"-50%"},{opacity:"0", x:"-100%", y:"-50%", ease:Power2.easeInOut});
            	var stageTitle = $(stage).find('.js-stage-description');
            	TweenLite.fromTo(stageTitle, .75, {x:"0%"},{x:"-50%", ease:Power2.easeInOut});

                TweenLite.fromTo(prevStage, 1, {opacity:"0", x:"0%", y: "-50%"},{opacity:"1", x:"-50%", y:"-50%", ease:Power2.easeInOut});
     			var prevStageTitle = $(prevStage).find('.js-stage-description');
     			TweenLite.fromTo(prevStageTitle, 1, {x:"50%"},{x:"0%", ease:Power2.easeInOut});
     			TweenLite.to(prevStageStep, 0, {x:"0%", scale:"1", opacity:"1"});


            // POINTS ON THE TABLE

               
                var table_stage = $('.table__stages').find("[data-stage=" + stageDataNav + "]");
                console.log(table_stage);
                table_stage.addClass('show');
                TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});


            	//add classes to table points
	            var tableNav = $(table_stage).find(".js-table-step:last");
	            var tableNavUp = $(tableNav).prevAll('.js-table-step');
	            var tableNavDown = $(tableNav).nextAll('.js-table-step');
	            tableNavUp.removeClass('active');
	            tableNavUp.addClass('focus');
	            tableNav.addClass('active');
	            tableNavDown.removeClass('active');
	            tableNavDown.removeClass('focus');


	        //animate progress line 

    		drawStepLine();


             //ANIMATION FOR CARDS
                var step_id = $(prevStageStep).data('position');
                positions(step_id);

                drawNavLine();
            } else {
                hideSection();
                showIntro();
            }
         }
    }


    function showStage(e){
        e.preventDefault();
        var current = $(e.currentTarget);
        var data = $(current).data('stage');
        var stage = $('.'+data);
        var activeNav = $(current).siblings('.js-stage-nav.active');
        var upNavs = $(current).prevAll('.js-stage-nav');
        var downNavs = $(current).nextAll('.js-stage-nav');
        var firstStep = $(stage).find('.js-step:first-child');
        var firstStepSiblings = $(firstStep).siblings(".js-step");
        var stages = $(stage).siblings('.js-stage');
        var activeStep = $(stages).find('.js-step');

    //remove steps from current if clicked twiced    
    	var currentActiveStep = $(stage).find('.js-step');
    	var currentSteps = $(stage).find('.js-step-nav');
    	currentActiveStep.removeClass('active');
    	currentSteps.removeClass('active');
    	currentSteps.removeClass('focus');

    //remove steps navigations classes
        var steps = $(stages).find('.js-step-nav');      
        steps.removeClass('active');
        steps.removeClass('focus');

        activeNav.removeClass('active');
        downNavs.removeClass('focus');
        upNavs.addClass('focus');
        current.addClass('active');

        stages.removeClass("active");
        activeStep.removeClass("active");
        stage.addClass("active");
        firstStep.addClass("active");

        TweenLite.to(stages, .75, {opacity:"0", x:"0%", y:"-50%", ease:Power2.easeInOut});
        var stagesTitle = $(stages).find('.js-stage-description');
        TweenLite.to(stagesTitle, .75,{x:"50%", ease:Power2.easeInOut});
        TweenLite.fromTo(stage, 1, {opacity:"0", x:"-75%", y: "-50%"},{opacity:"1", x:"-50%", y:"-50%", ease:Power2.easeInOut});
        var stageTitle = $(stage).find('.js-stage-description');
        TweenLite.fromTo(stageTitle, 1, {x:"-50%"},{x:"0%", ease:Power2.easeInOut});
        TweenLite.to(activeStep, 1, {opacity:"0", x:"0%"});
        TweenLite.to(firstStep, 0, {opacity:"1", x:"0%"});
        TweenLite.to(firstStepSiblings, 0, {opacity:"0"});


     // POINTS ON THE TABLE
               
        var table_stage = $('.table__stages').find("[data-stage=" + data + "]");
        table_stage.addClass('show');
        TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
        TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});
    
    //remove table points classes
        $('.js-table-step').removeClass('active');
        $('.js-table-step').removeClass('focus');


    //ANIMATION CARDS
         var step_id = $(current).data('position');
         positions(step_id);


     //ANIMATION FOR STAGE NAV LINE
		drawNavLine();  

	//remove line from steps navigation
		removeStepLine();
    }

    function drawNavLine(){
    	var stageNavLine = $(".js-stage-nav.active").closest(".js-stages").find('.js-stage-line');
     	var activePosition = $('.js-stage-nav.active').position();
     	var height = Math.round(activePosition.top);
     	TweenLite.to(stageNavLine, .5, {height: height, ease:Power2.easeInOut});
    }

    function hideNavLine(){
     	TweenLite.to('.js-stage-line', .5, {height: "0%", ease:Power2.easeInOut});
    }

    function showTableStep(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var step_id = $(current).data('step');
        var step = $('.'+step_id);
        var activeStep  = $(step).siblings('.js-step.active');

    //navigation top
        var activeStepNav = $('.js-stage.active').find("[data-step=" + step_id + "]");
        var upNavs = $(activeStepNav).prevAll('.js-step-nav');
        var downNavs = $(activeStepNav).nextAll('.js-step-nav');


        activeStepNav.addClass('active');
        activeStep.removeClass("active");
        step.show().addClass('active');
        
        upNavs.addClass('focus');
        upNavs.removeClass('active');
        downNavs.removeClass('focus');
        downNavs.removeClass('active');

        TweenLite.fromTo(step, .5, {opacity:"0", scale:".75", x:"0%"}, {x:"0%", opacity:"1", scale:"1", ease:Power2.easeInOut});
		TweenLite.fromTo(activeStep, .5, {opacity:"1", x:"0%"}, {opacity:"0", x:"50%", ease:Power2.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});

    //TABLE POSITIONS
        var tableStep = $('.table__stage.show').find('[data-step=' + step_id + ']');
        var tableStepDown = $(tableStep).prevAll('.js-table-step');
        var tableStepUp = $(tableStep).nextAll('.js-table-step');
        tableStep.addClass('active');

        tableStepDown.removeClass('active');
        tableStepDown.addClass('focus');

        tableStepUp.removeClass('active');
        tableStepUp.removeClass('focus');

    //animate progress line 
    	drawStepLine();

    //CARD ANIMATIOn
        positions(step_id);
    }

    function showStep(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var data = $(current).data('step');
        var step_id = $(current).data('position');
        var step = $('.'+data);
        var activeStep  = $(step).siblings('.js-step.active');
        var upNavs = $(current).prevAll('.js-step-nav');
        var downNavs = $(current).nextAll('.js-step-nav');

        current.addClass('active');
        activeStep.removeClass("active");
        step.show().addClass('active');
        
        upNavs.addClass('focus');
        upNavs.removeClass('active');
        downNavs.removeClass('focus');
        downNavs.removeClass('active');

        
		TweenLite.fromTo(step, .5, {opacity:"0", scale:".75", x:"0%"}, {x:"0%", opacity:"1", scale:"1", ease:Power2.easeInOut});
		TweenLite.fromTo(activeStep, .5, {opacity:"1", x:"0%"}, {opacity:"0", x:"50%", ease:Power2.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});


    //TABLE POSITIONS
        var tableStep = $('.table__stage.show').find('[data-step=' + data + ']');
        var tableStepDown = $(tableStep).prevAll('.js-table-step');
        var tableStepUp = $(tableStep).nextAll('.js-table-step');
        tableStep.addClass('active');

        tableStepDown.removeClass('active');
        tableStepDown.addClass('focus');

        tableStepUp.removeClass('active');
        tableStepUp.removeClass('focus');

    //animate progress line 

    	drawStepLine();

    //CARD ANIMATIOn
        positions(step_id);
    }

    function drawStepLine(){
    	var stageStepLine = $(".js-stage.active").find('.js-steps-line');
     	var activePosition = $('.js-step-nav.active').position();
     	var width = Math.round(activePosition.left);
    	console.log(stageStepLine,activePosition, width);
     	TweenLite.to(stageStepLine, .5, {width: width, ease:Power2.easeInOut});
    }

    function removeStepLine() {
    	TweenLite.to(".js-steps-line", .5, {width: "0", ease:Power2.easeInOut});
    }

//ANIMATION FOR STEPS!!!!!

    function positions(step_id){
        var table_card = texas_cards.filter(function ( table_card ) {
            return table_card.step_id === step_id;
        })[0];

        for (var i = 1; i < 18; i++) {
            var card = $('.table__card-' + i );
            var left = table_card["card_" + i + "_left"] + "%";
            var top = table_card["card_" + i + "_top"] + "%";
            var rotate = table_card["card_" + i + "_rotate"];
            
            TweenLite.to(card, 1, {left:left, top: top, rotation: rotate, x: "-50%", y: "-50%", ease:Power2.easeInOut});

        }


    }


//SHOW TIPSSSSS...................

    function showTips() {
        var activeGame = $('.js-game.active');
        var section = $(activeGame).find('.js-section-tips');
        var firstStage = $(section).find(".js-stage:first-child");
        var firstStep = $(firstStage).find('.js-step:first-child');

        section.addClass('active');
        firstStage.addClass('active');
        firstStep.show().addClass('active');
        TweenLite.to(section, 1, {opacity:"1", ease:Power2.easeInOut});

         //animate text
     		TweenLite.fromTo(firstStage, 1, {opacity:"0", x:"-75%", y: "-50%"},{opacity:"1", x:"-50%", y:"-50%", ease:Power2.easeInOut});
     		var firstStageTitle = $(firstStage).find('.js-stage-description');
     		TweenLite.fromTo(firstStageTitle, 1, {x:"-50%"},{x:"0%", ease:Power2.easeInOut});
     		TweenLite.to(firstStep, 0, {x:"0%", opacity:"1"});
    }

    function showNextStepTips(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var nextStep = $(activeStep).next('.js-step');
        var nextStage = $(stage).next('.js-stage');
        var nextStageStep = $(nextStage).find('.js-step:first-child');

        if (nextStep.length) {
            activeStep.removeClass('active');
            nextStep.show().addClass('active');
            TweenLite.fromTo(nextStep, .3, {scale:"0.75", opacity:"0", x:"0%"},{scale:"1", opacity:"1", x:"0%", ease:Power0.easeInOut});
            TweenLite.fromTo(activeStep, .3, {opacity:"1", x:"0%"}, {x:"100%", opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
       } else {
            if (nextStage.length ) {
                stage.removeClass('active');
                nextStage.addClass('active');
                nextStageStep.show().addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(nextStage, 1, {opacity:"1", ease:Power2.easeInOut});
                TweenLite.to(nextStageStep, 1, {opacity:"1", ease:Power2.easeInOut});
            } else {
                hideSection();
            }
       }
    }


    function showPrevStepTips(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var prevStep = $(activeStep).prev('.js-step');
        var prevStage = $(stage).prev('.js-stage');
        var prevStageStep = $(prevStage).find('.js-step:last-child');

         if (prevStep.length) {
            activeStep.removeClass('active');
            prevStep.show().addClass('active');
            TweenLite.fromTo(activeStep, .3, {opacity:"1", scale:"1"}, {opacity:"0", scale:"0.75",ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.fromTo(prevStep, .3,{opacity:"0", x:"100%"}, {opacity:"1", x:"0%", ease:Power0.easeInOut});
         } else {
            if (prevStage.length) {
                stage.removeClass('active');
                prevStage.addClass('active');
                prevStageStep.show().addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(prevStage, 1, {opacity:"1", ease:Power2.easeInOut});
                TweenLite.to(prevStageStep, 1, {opacity:"1", ease:Power2.easeInOut});
            } else {
                hideSection();
                showRules();
            }
         }
    }

    



    function hideSection(){
        var section = $('.js-section.active');
        var stage = $(section).find(".js-stage.active");
        var step = $(stage).find('.js-step.active');
    //right nav
        var stageNavs = $(section).find('.js-stage-nav');
        var stepNavs = $(section).find('.js-step-nav');

        stageNavs.removeClass('active');
        stageNavs.removeClass('focus');

        stepNavs.removeClass('active');
        stepNavs.removeClass('focus');

        section.removeClass('active');
        stage.removeClass('active');
        step.removeClass('active');


        TweenLite.fromTo(stage, 1, {x:"-50%", y:"-50%", opacity:"1"},{x:"0%", y:"-50%", opacity:"0",ease:Power2.easeInOut});
       	var stageTitle = $(stage).find('.js-stage-description');
       	TweenLite.fromTo(stageTitle, 1, {x: "0%"}, {x:"50%", ease:Power2.easeInOut});

        TweenLite.to(section, 1, {opacity:"0", ease:Power2.easeInOut});
        TweenLite.to(step, .5, {opacity:"0", ease:Power2.easeInOut, onComplite: hideAllItems});
        
        
        hideNavLine();
    }


//hide items on different actions

    function hideStep(activeStep){
        activeStep.find('.nano-content').scrollTop(0);
    }
    
    function hideAllItems(){
        $('.js-step.active').find('.nano-content').scrollTop(0);
    }







//OPEN MENU



//CARDS MOVES AROUND THE SCREEN
    
    //move main cards block to the left
    function moveMainCardsLeft() {
        TweenLite.to(".main-cards", 1.5, {x:"-75%", y:"-50%", ease:Power2.easeInOut});
    }
    //move main cards block close to the border
    function moveMainCardsLeftBorder() {
        TweenLite.to(".main-cards", 1.5, {x:"-90%", y:"-50%", ease:Power2.easeInOut});
    }

    //move main cards block to center
    function moveMainCardsCenter() {
        TweenLite.to(".main-cards", 1.5, {x:"-50%", y:"-50%", ease:Power2.easeInOut});
    }

    //zoom out main card block
    function zoomOutMainCards(){
        TweenLite.to(".main-cards", 1.5, {width:"50%", ease:Power2.easeInOut});
    }

    function zoomInMainCards(){
        TweenLite.to(".main-cards", 1.5, {width:"90%", ease:Power2.easeInOut});
    }

//CARDS ROTATIONS 

    function rotateToFaceUp(faceup, facedown){
        TweenLite.to(faceup, 1, {rotationY:"-155", ease:Power2.easeInOut});
        TweenLite.to(facedown, 1, {rotationY:"25", ease:Power2.easeInOut});
    }
    function rotateToFaceDown(faceup, facedown) {
        // TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0});
        TweenLite.to(faceup, 1, {rotationY:"180", scale: "1", ease:Power2.easeInOut});
        TweenLite.to(facedown, 1, {rotationY:"0", scale: "1", ease:Power2.easeInOut});
    }
    function rotateToFaceUpFull(rotateElem){
        TweenLite.to(rotateElem, 1.5, {rotationY:"-180", ease:Power2.easeInOut});
    }

    function rotateDown(rotateElem) {
        TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0, onComplete:rotateOneByOne}, .1);
    }

    function rotateOneByOneAndScale() {
         // timeline.staggerTo(".main-card-wrap", 1, {rotationY:-180, ease:Power2.easeInOut, onComplete:scaleActiveMainCard});
         TweenMax.staggerTo(".js-faceup", 1, {rotationY:"0", ease:Power2.easeInOut}, .1);
         TweenMax.staggerTo(".js-facedown", 1, {rotationY:"-180", ease:Power2.easeInOut, onComplete:scaleActiveMainCard},.1);
    }

    function scaleActiveMainCard() {
    	var active = $(".js-main-card.active");
    	var passive = $(".js-main-card.passive");
    	TweenLite.to(active, 0.5, {scale:"1.1", ease:Power2.easeInOut});
    	TweenLite.to(passive, 0.5, {scale:"1", opacity:".5",ease:Power2.easeInOut});
    }


//CARD SCALE 
    function scaleToInitial(){
        TweenLite.to(".js-main-card", 0.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(".js-glow", 0.5, {opacity:"0", ease:Power2.easeInOut});
    }

// remove class active from main cards block
    function addActiveMainCards() {
        $('.main-cards').addClass('active');
    }
    function removeActiveMainCards() {
        $('.main-cards').removeClass('active');
    }

// REMOVE BUTTON

    function showBackButton() {
        $('.back--left').addClass('show');
        TweenLite.to(".back--left", .3, {opacity:"1", ease:Power0.easeInOut});
    }
    function removeBackButton(){
        TweenLite.to(".btn--back", .3, {opacity:"0", ease:Power0.easeInOut});
        $('.btn--back').removeClass('show');
    }

    // $(document).ready(preloader);
    init();
})(PxLoader, PxLoaderImage);