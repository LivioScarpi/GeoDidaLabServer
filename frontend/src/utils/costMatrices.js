var costMatrix = [
[0, 2177, 2796, 2269, 1207, 2089, 3556, 2987, 3548, 2335, 1601, 2857, 1904, 1588, 2550, 1793, 1822, 2490, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2177, 0, 3277, 3146, 1400, 3438, 2500, 3493, 3370, 3288, 3239, 2838, 3368, 3022, 1485, 1648, 1741, 2776, 4177, 2568, 3483, 3683, 3767, 3166, 2202, 3395, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2796, 3277, 0, 3408, 2733, 1395, 2606, 3172, 1458, 1449, 2949, 2265, 2369, 1692, 2467, 2875, 4098, 1887, 2017, 3556, 3434, 1942, 2686, 2695, 2368, 2002, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2269, 3146, 3408, 0, 2489, 3261, 4157, 3132, 1225, 2900, 3047, 2092, 1302, 2176, 1645, 2149, 3328, 3748, 2469, 2076, 3677, 3182, 3628, 2565, 2702, 3047, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[1207, 1400, 2733, 2489, 0, 2723, 1419, 1450, 2673, 1894, 4074, 2091, 3570, 3642, 1824, 1640, 4120, 3286, 2514, 2197, 3855, 2894, 3061, 1346, 3299, 4123, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2089, 3438, 1395, 3261, 2723, 0, 1911, 3967, 3135, 1983, 4119, 2473, 2369, 1504, 2164, 2683, 1347, 1767, 1526, 3837, 1247, 2978, 3739, 2787, 3653, 1795, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[3556, 2500, 2606, 4157, 1419, 1911, 0, 2454, 2774, 1270, 2363, 3803, 2842, 2787, 3594, 1707, 2305, 2165, 2709, 2949, 3261, 2084, 3886, 2136, 3866, 1989, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2987, 3493, 3172, 3132, 1450, 3967, 2454, 0, 1788, 1407, 3337, 2365, 1619, 1576, 3861, 2182, 4053, 4191, 2376, 3885, 2901, 1914, 2644, 2750, 1979, 1470, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[3548, 3370, 1458, 1225, 2673, 3135, 2774, 1788, 0, 3410, 1238, 1386, 2308, 3036, 1258, 2876, 2921, 3021, 1780, 4123, 1849, 3112, 1333, 2682, 1943, 1538, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2335, 3288, 1449, 2900, 1894, 1983, 1270, 1407, 3410, 0, 2337, 4199, 3916, 3585, 2287, 2809, 3024, 1625, 4061, 3095, 2669, 2679, 1840, 4021, 2172, 2734, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[1601, 3239, 2949, 3047, 4074, 4119, 2363, 3337, 1238, 2337, 0, 1338, 1743, 3874, 1278, 2914, 1426, 3507, 3129, 3307, 3126, 3881, 3549, 4200, 2807, 1987, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2857, 2838, 2265, 2092, 2091, 2473, 3803, 2365, 1386, 4199, 1338, 0, 1872, 3952, 2084, 2222, 3167, 2765, 3170, 3927, 1507, 2249, 2573, 4038, 2677, 1617, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[1904, 3368, 2369, 1302, 3570, 2369, 2842, 1619, 2308, 3916, 1743, 1872, 0, 3377, 1910, 1689, 1867, 1911, 1822, 2688, 1834, 2093, 2160, 3791, 3447, 3961, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[1588, 3022, 1692, 2176, 3642, 1504, 2787, 1576, 3036, 3585, 3874, 3952, 3377, 0, 2577, 3162, 2649, 2987, 1973, 2561, 3782, 1561, 4009, 2209, 4029, 2658, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2550, 1485, 2467, 1645, 1824, 2164, 3594, 3861, 1258, 2287, 1278, 2084, 1910, 2577, 0, 2095, 3345, 2333, 1541, 2352, 2114, 3503, 1900, 2920, 3872, 2847, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[1793, 1648, 2875, 2149, 1640, 2683, 1707, 2182, 2876, 2809, 2914, 2222, 1689, 3162, 2095, 0, 4041, 3625, 2515, 4039, 3131, 2570, 1812, 3711, 2483, 1977, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[1822, 1741, 4098, 3328, 4120, 1347, 2305, 4053, 2921, 3024, 1426, 3167, 1867, 2649, 3345, 4041, 0, 2017, 3000, 3799, 3382, 1391, 1341, 1862, 3534, 3657, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2490, 2776, 1887, 3748, 3286, 1767, 2165, 4191, 3021, 1625, 3507, 2765, 1911, 2987, 2333, 3625, 2017, 0, 1679, 4189, 3932, 4145, 2580, 3048, 2081, 1329, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[3121, 4177, 2017, 2469, 2514, 1526, 2709, 2376, 1780, 4061, 3129, 3170, 1822, 1973, 1541, 2515, 3000, 1679, 0, 3267, 3521, 3225, 1953, 2587, 2401, 2334, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[4017, 2568, 3556, 2076, 2197, 3837, 2949, 3885, 4123, 3095, 3307, 3927, 2688, 2561, 2352, 4039, 3799, 4189, 3267, 0, 2618, 3791, 2019, 3613, 3090, 3449, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[3262, 3483, 3434, 3677, 3855, 1247, 3261, 2901, 1849, 2669, 3126, 1507, 1834, 3782, 2114, 3131, 3382, 3932, 3521, 2618, 0, 3127, 1916, 3960, 3450, 2005, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2587, 3683, 1942, 3182, 2894, 2978, 2084, 1914, 3112, 2679, 3881, 2249, 2093, 1561, 3503, 2570, 1391, 4145, 3225, 3791, 3127, 0, 3498, 3839, 2107, 2478, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2103, 3767, 2686, 3628, 3061, 3739, 3886, 2644, 1333, 1840, 3549, 2573, 2160, 4009, 1900, 1812, 1341, 2580, 1953, 2019, 1916, 3498, 0, 1473, 4046, 3734, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[3997, 3166, 2695, 2565, 1346, 2787, 2136, 2750, 2682, 4021, 4200, 4038, 3791, 2209, 2920, 3711, 1862, 3048, 2587, 3613, 3960, 3839, 1473, 0, 3229, 2453, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[2844, 2202, 2368, 2702, 3299, 3653, 3866, 1979, 1943, 2172, 2807, 2677, 3447, 4029, 3872, 2483, 3534, 2081, 2401, 3090, 3450, 2107, 4046, 3229, 0, 3158, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 0, 2844, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 1111, 0, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 1111, 1111, 0, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 2222, 1111, 3121, 0, 3262, 2587, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 2222, 1111, 3121, 4017, 0, 2587, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 3333, 1111, 3121, 4017, 3262, 0, 2103, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 1111, 1111, 3121, 4017, 3262, 2587, 0, 3997, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 2221, 1111, 3121, 4017, 3262, 2587, 2103, 0, 2844, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 3333, 1111, 3121, 4017, 3262, 2587, 2103, 3997, 0, 4140, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 5555, 1111, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 0, 2844],
[4140, 3395, 2002, 3047, 4123, 1795, 1989, 1470, 1538, 2734, 1987, 1617, 3961, 2658, 2847, 1977, 3657, 1329, 2334, 3449, 2005, 2478, 3734, 2453, 3158, 6666, 1111, 3121, 4017, 3262, 2587, 2103, 3997, 2844, 4140, 0],

];

export {costMatrix};