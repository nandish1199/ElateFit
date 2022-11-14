
        $(document).ready(function() {
            $("#calcsubmit").click(function() {
                var idealWeight = "";
                var heightCM = $("#heightCM").val();
                var gender = $("input:radio[name=gender]:checked").val();

                $("#disclaimer").css("display","block");
                
                if (gender == "male") {
                    if (heightCM >= 137 && heightCM < 140) {
                        idealWeight = "[28.5 kg to 34.8 kg] or [63 lb to 77 lb]";
                    } else if (heightCM >= 140 && heightCM < 142) {
                        idealWeight = "[30.8 kg to 38.1 kg] or [68 lb to 84 lb]";
                    } else if (heightCM >= 142 && heightCM < 145) {
                        idealWeight = "[33.5 kg to 40.8 kg] or [74 lb to 90 lb]";
                    } else if (heightCM >= 145 && heightCM < 147) {
                        idealWeight = "[35.8 kg to 43.9 kg] or [79 lb to 97 lb]";
                    } else if (heightCM >= 147 && heightCM < 150) {
                        idealWeight = "[38.5 kg to 46.7 kg] or [85 lb to 103 lb]";
                    } else if (heightCM >= 150 && heightCM < 152) {
                        idealWeight = "[40.8 kg to 49.9 kg] or [90 lb to 110 lb]";
                    } else if (heightCM >= 152 && heightCM < 155) {
                        idealWeight = "[43.1 kg to 53 kg] or [95 lb to 117 lb]";
                    } else if (heightCM >= 155 && heightCM < 157) {
                        idealWeight = "[45.8 kg to 55.8 kg] or [101 lb to 123 lb]";
                    } else if (heightCM >= 157 && heightCM < 160) {
                        idealWeight = "[48.1 kg to 58.9 kg] or [106 lb to 130 lb]";
                    } else if (heightCM >= 160 && heightCM < 163) {
                        idealWeight = "[50.8 kg to 61.6 kg] or [112 lb to 136 lb]";
                    } else if (heightCM >= 163 && heightCM < 165) {
                        idealWeight = "[53 kg to 64.8 kg] or [117 lb to 143 lb]";
                    } else if (heightCM >= 165 && heightCM < 168) {
                        idealWeight = "[55.3 kg to 68 kg] or [122 lb to 150 lb]";
                    } else if (heightCM >= 168 && heightCM < 170) {
                        idealWeight = "[58 kg to 70.7 kg] or [128 lb to 156 lb]";
                    } else if (heightCM >= 170 && heightCM < 173) {
                        idealWeight = "[60.3 kg to 73.9 kg] or [133 lb to 163 lb]";
                    } else if (heightCM >= 173 && heightCM < 175) {
                        idealWeight = "[63 kg to 76.6 kg] or [139 lb to 169 lb]";
                    } else if (heightCM >= 175 && heightCM < 178) {
                        idealWeight = "[65.3 kg to 79.8 kg] or [144 lb to 176 lb]";
                    } else if (heightCM >= 178 && heightCM < 180) {
                        idealWeight = "[67.6 kg to 83 kg] or [149 lb to 183 lb]";
                    } else if (heightCM >= 180 && heightCM < 183) {
                        idealWeight = "[70.3 kg to 85.7 kg] or [155 lb to 189 lb]";
                    } else if (heightCM >= 183 && heightCM < 185) {
                        idealWeight = "[72.6 kg to 88.9 kg] or [160 lb to 196  lb]";
                    } else if (heightCM >= 185 && heightCM < 188) {
                        idealWeight = "[75.3 kg to 91.6  kg] or [166 lb to 202  lb]";
                    } else if (heightCM >= 188 && heightCM < 191) {
                        idealWeight = "[79.8 kg to 98 kg] or [171 lb to 209 lb]";
                    } else if (heightCM >= 191 && heightCM < 193) {
                        idealWeight = "[71.6 kg to 87.5 kg] or [176 lb to 216 lb]";
                    } else if (heightCM >= 193 && heightCM < 195) {
                        idealWeight = "[82.5 kg to 100.6 kg] or [182 lb to 222 lb]";
                    }
                }

                if (gender=="female") {
			if (heightCM >= 137 && heightCM < 140) {
				idealWeight= "[28.5 kg to 34.8 kg] or [63 lb to 77 lb]";
			} else if (heightCM >= 140 && heightCM < 142) {
				idealWeight= "[30.8 kg to 37.6 kg] or [68 lb to 83 lb]";
			} else if (heightCM >= 142 && heightCM < 145) {
				idealWeight= "[32.6 kg to 39.9 kg] or [72 lb to 88 lb]";
			} else if (heightCM >= 145 && heightCM < 147) {
				idealWeight= "[34.9 kg to 42.6 kg] or [77 lb to 94 lb]";
			} else if (heightCM >= 147 && heightCM < 150) {
				idealWeight= "[36.4 kg to 44.9 kg] or [81 lb to 99 lb]";
			} else if (heightCM >= 150 && heightCM < 152) {
				idealWeight= "[39 kg to 47.6 kg] or [86 lb to 105 lb]";
			} else if (heightCM >= 152 && heightCM < 155) {
				idealWeight= "[40.8 kg to 49.9 kg] or [90 lb to 110 lb]";
			} else if (heightCM >= 155 && heightCM < 157) {
				idealWeight= "[43.1 kg to 52.6 kg] or [95 lb to 116 lb]";
			} else if (heightCM >= 157 && heightCM < 160) {
				idealWeight= "[44.1 kg to 54.9 kg] or [99 lb to 121 lb]";
			} else if (heightCM >= 160 && heightCM < 163) {
				idealWeight= "[47.2 kg to 57.6 kg] or [104 lb to 127 lb]";
			} else if (heightCM >= 163 && heightCM < 165) {
				idealWeight= "[49 kg to 59.9 kg] or [108 lb to 132 lb]";
			} else if (heightCM >= 165 && heightCM < 168) {
				idealWeight= "[51.2 kg to 62.6 kg] or [113 lb to 138 lb]";
			} else if (heightCM >= 168 && heightCM < 170) {
				idealWeight= "[53 kg to 64.8 kg] or [117 lb to 143 lb]";
			} else if (heightCM >= 170 && heightCM < 173) {
				idealWeight= "[55.3 kg to 67.6 kg] or [122 lb to 149 lb]";
			} else if (heightCM >= 173 && heightCM < 175) {
				idealWeight= "[57.1 kg to 69.8 kg] or [126 lb to 154 lb]";
			} else if (heightCM >= 175 && heightCM < 178) {
				idealWeight= "[59.4 kg to 72.6 kg] or [131 lb to 160 lb]";
			} else if (heightCM >= 178 && heightCM < 180) {
				idealWeight= "[61.2 kg to 74.8 kg] or [135 lb to 165 lb]";
			} else if (heightCM >= 180 && heightCM < 183) {
				idealWeight= "[63.5 kg to 77.5 kg] or [140 lb to 171 lb]";
			} else if (heightCM >= 183 && heightCM < 185) {
				idealWeight= "[65.3 kg to 79.8 kg] or [144 lb to 176  lb]";
			} else if (heightCM >= 185 && heightCM < 188) {
				idealWeight= "[67.6 kg to 82.5 kg] or [149 lb to 182  lb]";
			} else if (heightCM >= 188 && heightCM < 191) {
				idealWeight= "[69.4 kg to 84.8 kg] or [153 lb to 187 lb]";
			} else if (heightCM >= 191 && heightCM < 193) {
				idealWeight= "[71.6 kg to 87.5 kg] or [158 lb to 193 lb]";
			} else if (heightCM >= 193 && heightCM < 195) {
				idealWeight= "[73.5 kg to 89.8 kg] or [162 lb to 198 lb]";
			}
		}
                $("#idlweightdisplay").html('<h3 style="margin-left:15px;"><b>Your Ideal Weight should be:</b></h3> <h2 style="background: #39CCCC;padding:20px;"> '+idealWeight+'</h2>');
            });
        });