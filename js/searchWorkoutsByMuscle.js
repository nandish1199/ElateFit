const exerciseCatalog = [
  // --- Original 14 Exercises ---
  [
    "../images/static/workouts/shoulder_press.png",
    "Shoulder Press",
    "Shoulders",
    "Dumbbell",
    "Intermediate",
    "Builds pressing strength through the shoulders and upper arms.",
    [
      "Sit or stand tall with the weights at shoulder height.",
      "Press the weights overhead without locking the elbows.",
      "Lower with control and repeat.",
    ],
  ],
  [
    "../images/static/workouts/lateral_raise.png",
    "Lateral Raise",
    "Shoulders",
    "Dumbbell",
    "Beginner",
    "Targets the side deltoids for stronger, broader shoulders.",
    [
      "Stand with weights beside your thighs.",
      "Raise your arms until they are level with your shoulders.",
      "Lower slowly without swinging.",
    ],
  ],
  [
    "../images/static/workouts/biceps_curl.png",
    "Biceps Curl",
    "Biceps",
    "Dumbbell",
    "Beginner",
    "A simple isolation exercise for the front of the upper arm.",
    [
      "Keep elbows close to your sides.",
      "Curl the weights toward your shoulders.",
      "Lower fully while keeping tension.",
    ],
  ],
  [
    "../images/static/workouts/hammer_curl.png",
    "Hammer Curl",
    "Biceps",
    "Dumbbell",
    "Beginner",
    "Works the biceps and forearms with a neutral grip.",
    [
      "Hold the dumbbells with palms facing inward.",
      "Curl without rotating your wrists.",
      "Lower under control.",
    ],
  ],
  [
    "../images/static/workouts/bench_press.png",
    "Bench Press",
    "Chest",
    "Barbell",
    "Intermediate",
    "Develops pressing strength across the chest, shoulders, and triceps.",
    [
      "Set your eyes below the bar and plant your feet.",
      "Lower the bar toward the middle of your chest.",
      "Press upward while keeping your wrists steady.",
    ],
  ],
  [
    "../images/static/workouts/push_up.png",
    "Push-up",
    "Chest",
    "Bodyweight",
    "Beginner",
    "A versatile bodyweight push that trains the chest and arms.",
    [
      "Place hands just wider than shoulder width.",
      "Lower your body as one unit.",
      "Push the floor away to return.",
    ],
  ],
  [
    "../images/static/workouts/triceps_extension.png",
    "Triceps Extension",
    "Triceps",
    "Dumbbell",
    "Beginner",
    "Isolates the back of the upper arms.",
    [
      "Hold one dumbbell overhead with both hands.",
      "Bend your elbows to lower it behind your head.",
      "Extend your arms without flaring your elbows.",
    ],
  ],
  [
    "../images/static/workouts/triceps_dip.png",
    "Triceps Dip",
    "Triceps",
    "Bodyweight",
    "Intermediate",
    "Builds triceps strength using controlled bodyweight pressing.",
    [
      "Use parallel bars or a stable bench.",
      "Lower until your elbows reach roughly 90 degrees.",
      "Press back up without shrugging.",
    ],
  ],
  [
    "../images/static/workouts/lat_pulldown.png",
    "Lat Pulldown",
    "Back",
    "Cable",
    "Beginner",
    "Trains the lats and upper back with a vertical pulling motion.",
    [
      "Grip the bar wider than shoulder width.",
      "Pull it toward your upper chest.",
      "Return slowly while keeping your torso stable.",
    ],
  ],
  [
    "../images/static/workouts/deadlift.png",
    "Deadlift",
    "Back",
    "Barbell",
    "Advanced",
    "A full-body hinge that develops the posterior chain and back strength.",
    [
      "Stand with the bar over your mid-foot.",
      "Brace your core and hinge to grip the bar.",
      "Stand tall by driving through the floor.",
    ],
  ],
  [
    "../images/static/workouts/bodyweight_squat.png",
    "Bodyweight Squat",
    "Legs",
    "Bodyweight",
    "Beginner",
    "A foundational lower-body movement for strength and mobility.",
    [
      "Stand with feet around shoulder width.",
      "Sit your hips down and back.",
      "Drive through your feet to stand.",
    ],
  ],
  [
    "../images/static/workouts/leg_press.png",
    "Leg Press",
    "Legs",
    "Machine",
    "Intermediate",
    "Builds lower-body strength with guided machine resistance.",
    [
      "Place feet comfortably on the platform.",
      "Lower with knees tracking over your toes.",
      "Press without locking your knees.",
    ],
  ],
  [
    "../images/static/workouts/romanian_deadlift.png",
    "Romanian Deadlift",
    "Hamstrings",
    "Dumbbell",
    "Intermediate",
    "Strengthens hamstrings and glutes through a controlled hip hinge.",
    [
      "Hold weights close to your thighs.",
      "Push hips back while keeping a soft knee bend.",
      "Drive hips forward to stand tall.",
    ],
  ],
  [
    "../images/static/workouts/standing_calf_raise.png",
    "Standing Calf Raise",
    "Calves",
    "Bodyweight",
    "Beginner",
    "Builds strength and control through the lower leg.",
    [
      "Stand tall with support if needed.",
      "Rise onto the balls of your feet.",
      "Pause at the top and lower slowly.",
    ],
  ],

  // --- Second Batch (10 Exercises) ---
  [
    "../images/static/workouts/pull_up.png",
    "Pull-up",
    "Back",
    "Bodyweight",
    "Advanced",
    "A classic vertical pull that builds upper back and lat strength.",
    [
      "Hang from a pull-up bar with hands slightly wider than shoulder-width.",
      "Pull your chest toward the bar by driving your elbows down.",
      "Lower yourself under control.",
    ],
  ],
  [
    "../images/static/workouts/barbell_squat.png",
    "Barbell Squat",
    "Legs",
    "Barbell",
    "Intermediate",
    "A foundational heavy compound movement for leg and core strength.",
    [
      "Rest the bar securely across your upper back.",
      "Squat down by sitting your hips back and bending your knees.",
      "Drive back up to the starting position.",
    ],
  ],
  [
    "../images/static/workouts/dumbbell_row.png",
    "Dumbbell Row",
    "Back",
    "Dumbbell",
    "Beginner",
    "A unilateral pulling exercise that targets the lats and mid-back.",
    [
      "Support your knee and hand on a bench with a flat back.",
      "Pull the dumbbell up toward your hip.",
      "Lower the weight with control until your arm is fully extended.",
    ],
  ],
  [
    "../images/static/workouts/plank.png",
    "Plank",
    "Abs",
    "Bodyweight",
    "Beginner",
    "An isometric core exercise that builds stability.",
    [
      "Rest on your forearms and toes, keeping your body in a straight line.",
      "Brace your core and squeeze your glutes.",
      "Hold the position without letting your hips sag.",
    ],
  ],
  [
    "../images/static/workouts/walking_lunges.png",
    "Walking Lunges",
    "Legs",
    "Dumbbell",
    "Intermediate",
    "A dynamic leg exercise for balance and unilateral strength.",
    [
      "Hold dumbbells by your sides and stand tall.",
      "Step forward and lower your back knee toward the floor.",
      "Push off the front foot to step directly into the next rep.",
    ],
  ],
  [
    "../images/static/workouts/cable_triceps_pushdown.png",
    "Cable Triceps Pushdown",
    "Triceps",
    "Cable",
    "Beginner",
    "Isolates the triceps using constant cable tension.",
    [
      "Attach a rope or straight bar to a high cable pulley.",
      "Keep your elbows pinned to your sides.",
      "Push the attachment down until your arms are fully extended.",
    ],
  ],
  [
    "../images/static/workouts/seated_cable_row.png",
    "Seated Cable Row",
    "Back",
    "Cable",
    "Intermediate",
    "A horizontal pulling movement for upper back thickness.",
    [
      "Sit at the machine with a slight bend in your knees.",
      "Pull the handle to your lower stomach, squeezing your shoulder blades.",
      "Return the handle slowly until your arms are extended.",
    ],
  ],
  [
    "../images/static/workouts/cable_crossover.png",
    "Cable Crossover",
    "Chest",
    "Cable",
    "Intermediate",
    "Provides continuous tension across the chest muscles.",
    [
      "Set two pulleys to a high position and grab the handles.",
      "Step forward and slightly bend your elbows.",
      "Bring your hands together in front of your chest, squeezing the pecs.",
    ],
  ],
  [
    "../images/static/workouts/bulgarian_split_squat.png",
    "Bulgarian Split Squat",
    "Legs",
    "Dumbbell",
    "Advanced",
    "A challenging single-leg squat variation.",
    [
      "Rest your rear foot on a bench behind you.",
      "Hold a dumbbell in each hand and step your front foot forward.",
      "Lower your hips until your front thigh is parallel to the floor, then push back up.",
    ],
  ],
  [
    "../images/static/workouts/russian_twist.png",
    "Russian Twist",
    "Abs",
    "Dumbbell",
    "Beginner",
    "Rotational core exercise to target the obliques.",
    [
      "Sit on the floor with your knees bent and feet slightly elevated.",
      "Hold a dumbbell or weight plate with both hands.",
      "Twist your torso to touch the weight to the floor on each side.",
    ],
  ],

  // --- Third Batch (40 Exercises) ---
  [
    "../images/static/workouts/incline_dumbbell_press.png",
    "Incline Dumbbell Press",
    "Chest",
    "Dumbbell",
    "Intermediate",
    "Targets the upper chest and front deltoids.",
    [
      "Set an adjustable bench to a 30-45 degree incline.",
      "Press the dumbbells straight up over your chest.",
      "Lower them slowly until you feel a stretch in your pecs.",
    ],
  ],
  [
    "../images/static/workouts/decline_barbell_bench_press.png",
    "Decline Barbell Bench Press",
    "Chest",
    "Barbell",
    "Intermediate",
    "Focuses on the lower pectoral muscles.",
    [
      "Secure your feet at the end of a decline bench.",
      "Lower the bar to your lower chest.",
      "Press back up powerfully.",
    ],
  ],
  [
    "../images/static/workouts/machine_pec_fly.png",
    "Machine Pec Fly",
    "Chest",
    "Machine",
    "Beginner",
    "Isolates the chest muscles with a guided arc.",
    [
      "Sit with your back flat against the pad and grip the handles.",
      "Bring the handles together in front of your chest.",
      "Slowly reverse the motion until your chest is stretched.",
    ],
  ],
  [
    "../images/static/workouts/dumbbell_pullover.png",
    "Dumbbell Pullover",
    "Chest",
    "Dumbbell",
    "Intermediate",
    "Expands the ribcage and works both the chest and lats.",
    [
      "Lie perpendicular across a bench holding one dumbbell with both hands.",
      "Lower the weight behind your head with slightly bent elbows.",
      "Pull it back over your chest.",
    ],
  ],
  [
    "../images/static/workouts/t_bar_row.png",
    "T-Bar Row",
    "Back",
    "Barbell",
    "Intermediate",
    "Builds mid-back thickness and lat width.",
    [
      "Straddle a T-bar machine or a barbell wedged in a corner.",
      "Hinge at the hips and grip the handles.",
      "Pull the weight toward your upper stomach.",
    ],
  ],
  [
    "../images/static/workouts/chin_up.png",
    "Chin-up",
    "Back",
    "Bodyweight",
    "Intermediate",
    "A vertical pull focusing heavily on the lats and biceps.",
    [
      "Grab the bar with an underhand grip, hands shoulder-width apart.",
      "Pull your body up until your chin clears the bar.",
      "Lower yourself with complete control.",
    ],
  ],
  [
    "../images/static/workouts/straight_arm_lat_pulldown.png",
    "Straight Arm Lat Pulldown",
    "Back",
    "Cable",
    "Beginner",
    "Isolates the lats without heavy bicep involvement.",
    [
      "Stand facing a cable machine with a straight bar attached high.",
      "Keep your arms straight and pull the bar down to your thighs.",
      "Slowly let the bar rise back up.",
    ],
  ],
  [
    "../images/static/workouts/hyperextension.png",
    "Hyperextension",
    "Back",
    "Machine",
    "Beginner",
    "Strengthens the lower back erectors.",
    [
      "Position yourself in a hyperextension bench with your hips supported.",
      "Cross your arms and lower your upper body toward the floor.",
      "Raise your torso until your body forms a straight line.",
    ],
  ],
  [
    "../images/static/workouts/front_dumbbell_raise.png",
    "Front Dumbbell Raise",
    "Shoulders",
    "Dumbbell",
    "Beginner",
    "Isolates the anterior (front) deltoids.",
    [
      "Stand holding dumbbells in front of your thighs.",
      "Raise the weights straight in front of you to shoulder height.",
      "Lower them down slowly.",
    ],
  ],
  [
    "../images/static/workouts/reverse_machine_fly.png",
    "Reverse Machine Fly",
    "Shoulders",
    "Machine",
    "Beginner",
    "Targets the rear deltoids for shoulder health and posture.",
    [
      "Sit facing the pad of a pec deck machine.",
      "Grip the handles and pull them backward, squeezing your shoulder blades.",
      "Return to the starting position.",
    ],
  ],
  [
    "../images/static/workouts/arnold_press.png",
    "Arnold Press",
    "Shoulders",
    "Dumbbell",
    "Intermediate",
    "A rotational shoulder press that hits multiple deltoid heads.",
    [
      "Hold dumbbells at shoulder level with palms facing your face.",
      "Press up while rotating your wrists outward.",
      "Finish with palms facing forward, then reverse the motion.",
    ],
  ],
  [
    "../images/static/workouts/upright_barbell_row.png",
    "Upright Barbell Row",
    "Shoulders",
    "Barbell",
    "Intermediate",
    "Builds the traps and lateral deltoids.",
    [
      "Hold a barbell with a slightly narrower than shoulder-width grip.",
      "Pull the bar straight up toward your chin, leading with your elbows.",
      "Lower the bar back to your waist.",
    ],
  ],
  [
    "../images/static/workouts/cable_face_pull.png",
    "Cable Face Pull",
    "Shoulders",
    "Cable",
    "Beginner",
    "Excellent for rear delts and rotator cuff health.",
    [
      "Attach a rope to a high pulley.",
      "Pull the rope toward your face, splitting the handles past your ears.",
      "Squeeze your upper back and release slowly.",
    ],
  ],
  [
    "../images/static/workouts/ez_bar_preacher_curl.png",
    "EZ Bar Preacher Curl",
    "Biceps",
    "Barbell",
    "Intermediate",
    "Isolates the biceps by preventing momentum.",
    [
      "Sit at a preacher bench with your upper arms flat on the pad.",
      "Curl the EZ bar upward toward your shoulders.",
      "Lower the bar until your arms are fully extended.",
    ],
  ],
  [
    "../images/static/workouts/concentration_curl.png",
    "Concentration Curl",
    "Biceps",
    "Dumbbell",
    "Beginner",
    "Focuses strictly on the bicep peak.",
    [
      "Sit on a bench, resting your elbow on the inside of your thigh.",
      "Curl the dumbbell upward, squeezing at the top.",
      "Lower it slowly to a full stretch.",
    ],
  ],
  [
    "../images/static/workouts/cable_bicep_curl.png",
    "Cable Bicep Curl",
    "Biceps",
    "Cable",
    "Beginner",
    "Provides constant tension on the biceps throughout the movement.",
    [
      "Attach a straight bar to a low pulley.",
      "Keep your elbows at your sides and curl the bar up.",
      "Slowly lower it back down.",
    ],
  ],
  [
    "../images/static/workouts/reverse_barbell_curl.png",
    "Reverse Barbell Curl",
    "Biceps",
    "Barbell",
    "Intermediate",
    "Targets the brachialis and forearm extensors.",
    [
      "Hold a barbell with an overhand (pronated) grip.",
      "Curl the bar upward keeping elbows tucked.",
      "Lower under control.",
    ],
  ],
  [
    "../images/static/workouts/barbell_skull_crusher.png",
    "Barbell Skull Crusher",
    "Triceps",
    "Barbell",
    "Intermediate",
    "Builds mass in the long head of the triceps.",
    [
      "Lie on a flat bench holding an EZ bar directly over your chest.",
      "Bend your elbows to lower the bar to your forehead.",
      "Extend your arms back to the starting position.",
    ],
  ],
  [
    "../images/static/workouts/overhead_cable_triceps_extension.png",
    "Overhead Cable Triceps Extension",
    "Triceps",
    "Cable",
    "Intermediate",
    "Keeps continuous tension on the triceps from a stretched position.",
    [
      "Attach a rope to a low pulley and turn away from the machine.",
      "Bring the rope behind your head with elbows pointing up.",
      "Extend your arms straight up.",
    ],
  ],
  [
    "../images/static/workouts/close_grip_bench_press.png",
    "Close-Grip Bench Press",
    "Triceps",
    "Barbell",
    "Intermediate",
    "A compound movement allowing heavy weight for triceps.",
    [
      "Lie on a bench and grip the barbell with hands shoulder-width apart.",
      "Lower the bar to your chest, keeping elbows tucked in.",
      "Press the bar up forcefully.",
    ],
  ],
  [
    "Dumbbell Triceps Kickback",
    "Triceps",
    "Dumbbell",
    "Beginner",
    "Isolates the triceps for a strong contraction.",
    [
      "Hinge forward and pin your upper arm parallel to the floor.",
      "Extend your elbow backward until your arm is straight.",
      "Return to a 90-degree angle.",
    ],
  ],
  [
    "Hack Squat",
    "Legs",
    "Machine",
    "Intermediate",
    "A machine-based squat that heavily isolates the quadriceps.",
    [
      "Position your shoulders under the pads and feet on the platform.",
      "Squat down until your thighs are parallel to the footplate.",
      "Drive back up to the starting position.",
    ],
  ],
  [
    "Barbell Forward Lunge",
    "Legs",
    "Barbell",
    "Intermediate",
    "Builds leg mass and unilateral balance.",
    [
      "Rest a barbell across your upper back.",
      "Step forward with one leg and lower your hips until both knees are at 90 degrees.",
      "Push off the front foot to return to the start.",
    ],
  ],
  [
    "Dumbbell Step-up",
    "Legs",
    "Dumbbell",
    "Beginner",
    "Develops glute and quad strength uniliaterally.",
    [
      "Hold dumbbells by your sides facing a sturdy box or bench.",
      "Step one foot firmly onto the box.",
      "Drive through that foot to lift your body up, then step back down.",
    ],
  ],
  [
    "Kettlebell Goblet Squat",
    "Legs",
    "Kettlebell",
    "Beginner",
    "Teaches perfect squat mechanics while building quad strength.",
    [
      "Hold a kettlebell against your chest with both hands.",
      "Sit your hips back and down between your knees.",
      "Keep your chest up and drive through your heels to stand.",
    ],
  ],
  [
    "Barbell Hip Thrust",
    "Glutes",
    "Barbell",
    "Intermediate",
    "The ultimate exercise for building glute strength and mass.",
    [
      "Sit on the floor with your upper back against a bench and a barbell over your hips.",
      "Drive through your heels to thrust your hips upward.",
      "Squeeze your glutes at the top and lower slowly.",
    ],
  ],
  [
    "Bodyweight Glute Bridge",
    "Glutes",
    "Bodyweight",
    "Beginner",
    "A fundamental floor exercise to activate the glutes.",
    [
      "Lie on your back with knees bent and feet flat on the floor.",
      "Push your hips into the air until your body forms a straight line.",
      "Squeeze glutes at the top and lower down.",
    ],
  ],
  [
    "Sissy Squat",
    "Legs",
    "Bodyweight",
    "Advanced",
    "Intense quad isolation utilizing bodyweight leverage.",
    [
      "Stand near a support, lock your hips, and lean your torso backward.",
      "Bend your knees forward, lowering your body toward the floor.",
      "Drive back up using only your quads.",
    ],
  ],
  [
    "Lying Leg Curl",
    "Hamstrings",
    "Machine",
    "Beginner",
    "Isolates the hamstrings with machine guidance.",
    [
      "Lie face down on the machine with the pad resting just above your heels.",
      "Curl the pad up toward your glutes.",
      "Lower the weight slowly to the start.",
    ],
  ],
  [
    "Seated Leg Curl",
    "Hamstrings",
    "Machine",
    "Beginner",
    "Targets hamstrings from a seated position, fully stretching the muscle.",
    [
      "Sit in the machine and adjust the pad over your ankles.",
      "Press your lower legs down and back toward you.",
      "Return to the extended position slowly.",
    ],
  ],
  [
    "Barbell Good Morning",
    "Hamstrings",
    "Barbell",
    "Advanced",
    "Strengthens the hamstrings, glutes, and lower back erectors.",
    [
      "Rest a barbell across your upper back like a squat.",
      "Hinge at the hips, keeping your legs mostly straight and back flat.",
      "Stand back up by squeezing your glutes and hamstrings.",
    ],
  ],
  [
    "Seated Machine Calf Raise",
    "Calves",
    "Machine",
    "Beginner",
    "Targets the soleus muscle of the lower leg.",
    [
      "Sit on the machine with the pads resting on your lower thighs.",
      "Drop your heels toward the floor to stretch the calves.",
      "Press up onto your toes as high as possible.",
    ],
  ],
  [
    "Leg Press Calf Raise",
    "Calves",
    "Machine",
    "Intermediate",
    "A heavy calf variation utilizing the leg press machine.",
    [
      "Place only the balls of your feet on the lower edge of the leg press platform.",
      "Let your heels drop back for a deep stretch.",
      "Press the platform away using your toes.",
    ],
  ],
  [
    "Standard Crunch",
    "Abs",
    "Bodyweight",
    "Beginner",
    "A basic core movement for the upper abdominals.",
    [
      "Lie on your back with knees bent and feet flat.",
      "Place hands behind your head and lift your shoulder blades off the floor.",
      "Squeeze your abs and slowly lower back down.",
    ],
  ],
  [
    "Hanging Leg Raise",
    "Abs",
    "Bodyweight",
    "Advanced",
    "An intense lower abdominal and hip flexor exercise.",
    [
      "Hang from a pull-up bar with a firm grip.",
      "Keep your legs straight and lift them until they are parallel to the floor.",
      "Lower them with control to avoid swinging.",
    ],
  ],
  [
    "Ab Wheel Rollout",
    "Abs",
    "Equipment",
    "Advanced",
    "Develops extreme core tension and anti-extension strength.",
    [
      "Kneel on the floor holding an ab wheel with both hands.",
      "Roll the wheel straight forward, extending your body as far as you can.",
      "Use your core to pull the wheel back to your knees.",
    ],
  ],
  [
    "Bicycle Crunch",
    "Abs",
    "Bodyweight",
    "Beginner",
    "Targets both the rectus abdominis and the obliques.",
    [
      "Lie on your back with hands behind your head and legs raised.",
      "Bring one knee toward your chest while twisting your opposite elbow to meet it.",
      "Alternate sides in a continuous pedaling motion.",
    ],
  ],
  [
    "Cable Woodchopper",
    "Abs",
    "Cable",
    "Intermediate",
    "A functional rotational core exercise.",
    [
      "Set a cable pulley to a high position and stand sideways to it.",
      "Grab the handle with both hands and pull it diagonally down across your body.",
      "Return to the top under control.",
    ],
  ],
  [
    "Barbell Wrist Curl",
    "Forearms",
    "Barbell",
    "Beginner",
    "Isolates the forearm flexors.",
    [
      "Sit on a bench, resting your forearms on your thighs holding a barbell palms up.",
      "Let the barbell roll down to your fingertips.",
      "Curl your wrists back up as far as possible.",
    ],
  ],
  [
    "Reverse Barbell Wrist Curl",
    "Forearms",
    "Barbell",
    "Beginner",
    "Targets the forearm extensors.",
    [
      "Sit holding a barbell with an overhand grip, forearms resting on your thighs.",
      "Lower the weight by bending your wrists downward.",
      "Extend your wrists upward against the weight.",
    ],
  ],
  [
    "Farmer's Walk",
    "Forearms",
    "Dumbbell",
    "Intermediate",
    "Builds massive grip strength, core stability, and traps.",
    [
      "Pick up a heavy pair of dumbbells or kettlebells.",
      "Stand tall with your shoulders back and chest up.",
      "Walk forward for a set distance or time without dropping the weight.",
    ],
  ],

  // --- Fourth Batch (50 New Exercises) ---
  [
    "Incline Cable Fly",
    "Chest",
    "Cable",
    "Intermediate",
    "Provides continuous tension on the upper pectoral muscles.",
    [
      "Set pulleys to a low position and lie on an incline bench.",
      "Bring the handles together above your chest in a hugging motion.",
      "Lower back down with a slight bend in your elbows.",
    ],
  ],
  [
    "Decline Dumbbell Press",
    "Chest",
    "Dumbbell",
    "Intermediate",
    "Targets the lower chest using independent weights.",
    [
      "Secure your feet on a decline bench and hold dumbbells over your chest.",
      "Lower the weights slowly until they reach chest level.",
      "Press them back up powerfully.",
    ],
  ],
  [
    "Spoto Press",
    "Chest",
    "Barbell",
    "Advanced",
    "A bench press variation that builds bottom-end pressing power.",
    [
      "Lower the barbell but stop an inch or two above your chest.",
      "Pause for a full second in the air.",
      "Press the bar back up to lockout.",
    ],
  ],
  [
    "Diamond Push-up",
    "Chest",
    "Bodyweight",
    "Intermediate",
    "A push-up variation that heavily recruits the triceps and inner chest.",
    [
      "Get into a push-up position with your hands close together, forming a diamond shape.",
      "Lower your chest toward your hands.",
      "Push back up to full extension.",
    ],
  ],
  [
    "Landmine Press",
    "Chest",
    "Barbell",
    "Beginner",
    "A shoulder-friendly pressing movement targeting the upper chest and front delts.",
    [
      "Wedge one end of a barbell into a corner and hold the other end at shoulder height.",
      "Press the bar up and away from you.",
      "Lower it back down under control.",
    ],
  ],

  [
    "Pendlay Row",
    "Back",
    "Barbell",
    "Advanced",
    "A strict barbell row from the floor for explosive back strength.",
    [
      "Hinge at the hips until your torso is parallel to the floor.",
      "Pull the bar off the floor directly to your lower chest.",
      "Return the bar to a dead stop on the floor for each rep.",
    ],
  ],
  [
    "Chest-Supported Dumbbell Row",
    "Back",
    "Dumbbell",
    "Intermediate",
    "Isolates the back by removing lower back fatigue.",
    [
      "Lie face down on a slightly inclined bench.",
      "Hold dumbbells with arms hanging straight down.",
      "Pull the weights up, squeezing your shoulder blades together, then lower.",
    ],
  ],
  [
    "Meadows Row",
    "Back",
    "Barbell",
    "Advanced",
    "A unilateral row using a landmine setup for thick lats.",
    [
      "Stand perpendicular to a landmine barbell and grip the thick end.",
      "Stagger your stance and rest your elbow on your front knee.",
      "Pull the barbell up toward your hip, then lower.",
    ],
  ],
  [
    "Rack Pull",
    "Back",
    "Barbell",
    "Advanced",
    "A partial deadlift that overloads the upper back and traps.",
    [
      "Set a barbell on rack pins just above or below your knees.",
      "Hinge and grip the bar, bracing your core.",
      "Stand up forcefully and lock out your hips.",
    ],
  ],
  [
    "Neutral Grip Pull-up",
    "Back",
    "Bodyweight",
    "Intermediate",
    "A joint-friendly pull-up variation targeting the lats.",
    [
      "Grip parallel handles on a pull-up bar so palms face each other.",
      "Pull yourself up until your chin is over the handles.",
      "Lower slowly to a dead hang.",
    ],
  ],
  [
    "Inverted Row",
    "Back",
    "Bodyweight",
    "Beginner",
    "An excellent horizontal pulling exercise for the mid-back.",
    [
      "Set a barbell in a rack at waist height and lie underneath it.",
      "Grab the bar and keep your body in a straight line with heels on the floor.",
      "Pull your chest up to the bar, then lower.",
    ],
  ],

  [
    "Seated Barbell Press",
    "Shoulders",
    "Barbell",
    "Intermediate",
    "A strict overhead press that removes leg drive.",
    [
      "Sit on a bench with a back support holding a barbell at upper chest level.",
      "Press the bar straight overhead until arms are extended.",
      "Lower back to the chest slowly.",
    ],
  ],
  [
    "Z Press",
    "Shoulders",
    "Barbell",
    "Advanced",
    "An overhead press performed seated on the floor to demand extreme core strength.",
    [
      "Sit flat on the floor with legs extended straight in front of you.",
      "Hold the barbell at shoulder height and press it overhead.",
      "Lower with absolute control so you don't fall backward.",
    ],
  ],
  [
    "Cable Lateral Raise",
    "Shoulders",
    "Cable",
    "Beginner",
    "Provides constant tension on the side deltoids.",
    [
      "Set a cable pulley to the lowest setting and stand sideways to it.",
      "Grab the handle with the opposite hand and pull it across your body and up.",
      "Lower it slowly back to the start.",
    ],
  ],
  [
    "Dumbbell Shrug",
    "Shoulders",
    "Dumbbell",
    "Beginner",
    "Isolates the upper trapezius muscles.",
    [
      "Stand tall holding heavy dumbbells at your sides.",
      "Shrug your shoulders straight up toward your ears.",
      "Hold the squeeze for a second, then lower.",
    ],
  ],
  [
    "Barbell Shrug",
    "Shoulders",
    "Barbell",
    "Intermediate",
    "Allows for maximum weight overload on the upper traps.",
    [
      "Hold a barbell in front of you with an overhand grip.",
      "Elevate your shoulders as high as possible.",
      "Lower the bar back to the starting position.",
    ],
  ],
  [
    "Reverse Pec Deck Fly",
    "Shoulders",
    "Machine",
    "Beginner",
    "A machine-based isolation for the rear delts.",
    [
      "Sit facing the pad of a pec deck machine.",
      "Grip the handles and pull them backward, squeezing your rear shoulders.",
      "Return to the starting position under control.",
    ],
  ],

  [
    "Incline Dumbbell Curl",
    "Biceps",
    "Dumbbell",
    "Intermediate",
    "Puts the biceps in a deep stretch for maximum hypertrophy.",
    [
      "Sit on a 45-degree incline bench with arms hanging straight down.",
      "Curl the dumbbells up while keeping your elbows pointed at the floor.",
      "Lower to a full stretch.",
    ],
  ],
  [
    "Spider Curl",
    "Biceps",
    "Dumbbell",
    "Intermediate",
    "Removes momentum and focuses on the short head of the bicep.",
    [
      "Lie chest-down on an incline bench with arms hanging straight.",
      "Curl the dumbbells up toward your shoulders.",
      "Lower them slowly to full extension.",
    ],
  ],
  [
    "Drag Curl",
    "Biceps",
    "Barbell",
    "Intermediate",
    "Keeps the tension strictly on the biceps by dragging the weight.",
    [
      "Hold a barbell with an underhand grip.",
      "Instead of curling in an arc, pull your elbows back and drag the bar up your torso.",
      "Lower the bar back down your shirt.",
    ],
  ],
  [
    "Zottman Curl",
    "Biceps",
    "Dumbbell",
    "Intermediate",
    "Works both the biceps and the forearms in one movement.",
    [
      "Curl the dumbbells up with palms facing up.",
      "At the top, rotate your wrists so your palms face down.",
      "Lower the weights with the overhand grip.",
    ],
  ],
  [
    "Cable Rope Hammer Curl",
    "Biceps",
    "Cable",
    "Beginner",
    "A constant tension variation for the brachialis and brachioradialis.",
    [
      "Attach a rope to a low pulley and grab it with a neutral grip.",
      "Curl the rope up toward your shoulders.",
      "Lower slowly.",
    ],
  ],

  [
    "Tate Press",
    "Triceps",
    "Dumbbell",
    "Advanced",
    "An elbows-out triceps extension that targets the lower triceps.",
    [
      "Lie on a bench holding dumbbells straight up.",
      "Flare your elbows out and lower the inner heads of the dumbbells to your chest.",
      "Press back up to lockout.",
    ],
  ],
  [
    "JM Press",
    "Triceps",
    "Barbell",
    "Advanced",
    "A hybrid between a close-grip bench press and a skull crusher.",
    [
      "Lie on a bench with a close grip on the barbell.",
      "Lower the bar in a straight line toward your neck while bending your elbows forward.",
      "Press the bar back up and back.",
    ],
  ],
  [
    "Cable Overhead Extension (Rope)",
    "Triceps",
    "Cable",
    "Intermediate",
    "Focuses on the long head of the triceps.",
    [
      "Attach a rope to a high pulley and face away from the machine.",
      "Hold the rope behind your head and step forward to create tension.",
      "Extend your arms straight out in front of you.",
    ],
  ],
  [
    "Single-arm Dumbbell Triceps Extension",
    "Triceps",
    "Dumbbell",
    "Beginner",
    "Allows for unilateral focus on the triceps.",
    [
      "Hold one dumbbell overhead with your arm fully extended.",
      "Lower the weight behind your head by bending your elbow.",
      "Extend back up.",
    ],
  ],
  [
    "Bodyweight Triceps Extension",
    "Triceps",
    "Bodyweight",
    "Advanced",
    "An intense bodyweight move similar to a skull crusher.",
    [
      "Place your hands on a low bar or bench in a plank position.",
      "Lower your body by bending your elbows and dropping your head below your hands.",
      "Push through your palms to extend your arms.",
    ],
  ],

  [
    "Front Squat",
    "Legs",
    "Barbell",
    "Advanced",
    "Shifts the focus entirely to the quadriceps and upper back.",
    [
      "Rest the barbell across your front deltoids and clavicle.",
      "Squat down while keeping your torso completely upright.",
      "Drive through your legs to stand.",
    ],
  ],
  [
    "Dumbbell Goblet Squat",
    "Legs",
    "Dumbbell",
    "Beginner",
    "A great foundational movement for quad strength and mobility.",
    [
      "Hold a single dumbbell vertically against your chest.",
      "Squat down, pushing your knees out.",
      "Stand back up, keeping your chest proud.",
    ],
  ],
  [
    "Jefferson Squat",
    "Legs",
    "Barbell",
    "Advanced",
    "An old-school multi-planar leg exercise.",
    [
      "Straddle a barbell loaded on the floor, one foot in front, one behind.",
      "Squat down and grab the bar with a mixed grip.",
      "Stand up, lifting the bar between your legs.",
    ],
  ],
  [
    "Zercher Squat",
    "Legs",
    "Barbell",
    "Advanced",
    "Builds incredible core and quad strength.",
    [
      "Hold a barbell in the crooks of your elbows, holding it against your stomach.",
      "Squat down with a wide stance.",
      "Drive back up, fighting the urge to lean forward.",
    ],
  ],
  [
    "Box Squat",
    "Legs",
    "Barbell",
    "Intermediate",
    "Develops explosive strength out of the hole.",
    [
      "Place a box behind you and unrack a barbell like a normal squat.",
      "Sit back onto the box, pausing for a split second.",
      "Explode back up to a standing position.",
    ],
  ],
  [
    "Leg Extension",
    "Legs",
    "Machine",
    "Beginner",
    "Strictly isolates the quadriceps.",
    [
      "Sit on the machine with the pad against your lower shins.",
      "Extend your legs fully to lift the weight.",
      "Lower the weight slowly under control.",
    ],
  ],

  [
    "Glute-Ham Raise (GHR)",
    "Hamstrings",
    "Machine",
    "Advanced",
    "One of the most effective hamstring exercises ever created.",
    [
      "Lock your ankles into a GHR machine with your knees on the pad.",
      "Lower your upper body until it is parallel to the floor.",
      "Use your hamstrings and calves to pull yourself back upright.",
    ],
  ],
  [
    "Kettlebell Swing",
    "Hamstrings",
    "Kettlebell",
    "Intermediate",
    "A dynamic hinge movement for hamstring and glute power.",
    [
      "Hold a kettlebell with both hands between your legs.",
      "Hinge at the hips, letting the bell swing back.",
      "Thrust your hips forward aggressively to swing the bell to chest height.",
    ],
  ],
  [
    "Stiff-Legged Deadlift",
    "Hamstrings",
    "Barbell",
    "Advanced",
    "Places maximum tension on the hamstrings.",
    [
      "Stand with feet shoulder-width apart holding a barbell.",
      "Keep your legs completely straight (but not locked) and hinge forward.",
      "Lower the bar until you feel a deep stretch, then pull back up.",
    ],
  ],

  [
    "Cable Pull-through",
    "Glutes",
    "Cable",
    "Beginner",
    "A joint-friendly hip hinge that isolates the glutes.",
    [
      "Attach a rope to a low pulley and stand facing away, straddling the cable.",
      "Hinge at the hips, letting the rope pull your hands between your legs.",
      "Squeeze your glutes to stand tall.",
    ],
  ],
  [
    "Frog Pumps",
    "Glutes",
    "Bodyweight",
    "Beginner",
    "A glute bridge variation that minimizes hamstring takeover.",
    [
      "Lie on your back and put the soles of your feet together, knees dropping outward.",
      "Tuck your chin and push your hips into the air.",
      "Squeeze hard at the top and lower.",
    ],
  ],
  [
    "Curtsy Lunge",
    "Glutes",
    "Dumbbell",
    "Intermediate",
    "Targets the glute medius and outer thighs.",
    [
      "Stand holding dumbbells at your sides.",
      "Step one foot back and across your other leg, lowering your hips.",
      "Drive through the front heel to return to the start.",
    ],
  ],
  [
    "Deficit Reverse Lunge",
    "Glutes",
    "Dumbbell",
    "Intermediate",
    "Increases range of motion for greater glute activation.",
    [
      "Stand on a small elevated platform or weight plate.",
      "Step backward off the plate into a deep lunge.",
      "Push off the front foot to return to the elevated platform.",
    ],
  ],

  [
    "Donkey Calf Raise",
    "Calves",
    "Machine",
    "Intermediate",
    "Stretches the calves deeply from a hinged position.",
    [
      "Position yourself in a donkey calf machine or have a partner sit on your lower back.",
      "Keep your legs straight and drop your heels.",
      "Push up onto your toes forcefully.",
    ],
  ],
  [
    "Single-Leg Calf Raise",
    "Calves",
    "Bodyweight",
    "Beginner",
    "Isolates imbalances between the left and right calves.",
    [
      "Stand on the edge of a step on one foot, holding a rail for balance.",
      "Let your heel drop below the step.",
      "Press up onto your tiptoes.",
    ],
  ],

  [
    "V-Ups",
    "Abs",
    "Bodyweight",
    "Intermediate",
    "A full contraction of the upper and lower abs simultaneously.",
    [
      "Lie flat on your back with arms and legs extended.",
      "Simultaneously lift your torso and legs to touch your hands to your toes.",
      "Lower back down with control.",
    ],
  ],
  [
    "Dead Bug",
    "Abs",
    "Bodyweight",
    "Beginner",
    "Trains core stability and anti-extension.",
    [
      "Lie on your back with arms extended up and knees bent at 90 degrees.",
      "Slowly lower one arm and the opposite leg toward the floor.",
      "Return to the center and switch sides.",
    ],
  ],
  [
    "Hollow Body Hold",
    "Abs",
    "Bodyweight",
    "Intermediate",
    "A gymnastics staple for brutal core endurance.",
    [
      "Lie on your back and press your lower back into the floor.",
      "Lift your legs a few inches off the ground and extend your arms behind your head.",
      "Hold this dish-like position rigidly.",
    ],
  ],
  [
    "Cable Crunch",
    "Abs",
    "Cable",
    "Intermediate",
    "Allows for weighted overload of the rectus abdominis.",
    [
      "Kneel facing a cable pulley with a rope attachment held behind your neck.",
      "Crunch your torso downward, bringing your elbows toward your knees.",
      "Slowly return to the upright kneeling position.",
    ],
  ],
  [
    "Dragon Flag",
    "Abs",
    "Bodyweight",
    "Advanced",
    "An extreme core challenge popularized by Bruce Lee.",
    [
      "Lie on a bench and grip the edges tightly behind your head.",
      "Lift your entire body (except your upper back) into the air so it is completely straight.",
      "Lower your straight body slowly without letting your hips sag.",
    ],
  ],
  [
    "L-Sit",
    "Abs",
    "Bodyweight",
    "Advanced",
    "Requires immense core compression and triceps strength.",
    [
      "Sit on the floor or between parallel bars with your hands planted.",
      "Push your body off the floor and extend your legs straight out in front of you.",
      "Hold this 'L' position for time.",
    ],
  ],

  [
    "Plate Pinch",
    "Forearms",
    "Equipment",
    "Beginner",
    "Builds pinch grip strength.",
    [
      "Place two weight plates together, smooth side out.",
      "Pinch the plates together with your fingers and thumb.",
      "Hold for as long as possible.",
    ],
  ],
  [
    "Towel Pull-up",
    "Forearms",
    "Bodyweight",
    "Advanced",
    "Turns a standard pull-up into an extreme grip challenge.",
    [
      "Drape two towels over a pull-up bar.",
      "Grip one towel in each hand.",
      "Perform pull-ups while crushing the towels to hold on.",
    ],
  ],
].map((item) => {
  // Check if the array has 7 items (meaning an image was added) or 6 items
  const hasImage = item.length === 7;

  return {
    src: hasImage ? item[0] : "../images/workouts/default_placeholder.png", // Fallback for missing images
    name: hasImage ? item[1] : item[0],
    muscle: hasImage ? item[2] : item[1],
    equipment: hasImage ? item[3] : item[2],
    difficulty: hasImage ? item[4] : item[3],
    description: hasImage ? item[5] : item[4],
    steps: hasImage ? item[6] : item[5],
  };
});

const FAVORITE_EXERCISES_KEY = "elateFitFavoriteExercises";
let favoriteExercises = loadFavoriteExercises();

function loadFavoriteExercises() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_EXERCISES_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveFavoriteExercises() {
  localStorage.setItem(
    FAVORITE_EXERCISES_KEY,
    JSON.stringify(favoriteExercises),
  );
}

function renderMuscleFilter() {
  const muscles = [
    "All muscles",
    ...new Set(exerciseCatalog.map((exercise) => exercise.muscle)),
  ];
  document.getElementById("muscleFilter").innerHTML =
    '<option value="">Choose a muscle group</option>' +
    muscles
      .map(
        (muscle) =>
          `<option value="${muscle === "All muscles" ? "" : muscle}">${muscle}</option>`,
      )
      .join("");
}

function matchesFilters(exercise) {
  const muscle = document.getElementById("muscleFilter").value;
  const equipment = document.getElementById("equipmentFilter").value;
  const difficulty = document.getElementById("difficultyFilter").value;
  return (
    (!muscle || exercise.muscle === muscle) &&
    (!equipment || exercise.equipment === equipment) &&
    (!difficulty || exercise.difficulty === difficulty)
  );
}

function renderExercises() {
  const results = exerciseCatalog.filter(matchesFilters);
  const list = document.getElementById("exerciseGrid");
  document.getElementById("resultCount").textContent =
    `${results.length} exercise${results.length === 1 ? "" : "s"} found`;
  list.innerHTML = results.length
    ? results
        .map((exercise) => {
          const favorite = favoriteExercises.includes(exercise.name);
          return `<article class="exerciseCard">
            <div class="exerciseImagePlaceholder"><img class="exerciseImage" src="${exercise.src}" alt="${exercise.name}"/></div>
            <div class="exerciseBody">
                <div class="exerciseHeader"><span class="exerciseName">${exercise.name}</span><button type="button" class="favoriteExercise ${favorite ? "is-favorite" : ""}" data-name="${exercise.name}" aria-label="${favorite ? "Remove" : "Add"} ${exercise.name} ${favorite ? "from" : "to"} favourites"><i class="fa-${favorite ? "solid" : "regular"} fa-heart"></i></button></div>
                <div class="exerciseMeta"><span class="metaPill">${exercise.muscle}</span><span class="metaPill">${exercise.equipment}</span><span class="metaPill">${exercise.difficulty}</span></div>
                <p class="exerciseDescription">${exercise.description}</p>
                <details class="exerciseDetails"><summary>View instructions</summary><ol>${exercise.steps.map((step) => `<li>${step}</li>`).join("")}</ol></details>
            </div>
        </article>`;
        })
        .join("")
    : '<div class="emptyResults">No exercises match these filters. Try another muscle group or keyword.</div>';
}

document.addEventListener("DOMContentLoaded", function () {
  renderMuscleFilter();
  renderExercises();

  const equipmentDropdown = document.getElementById("equipmentFilter");
  if (equipmentDropdown) {
    const allEquipment = [
      "All equipment",
      ...new Set(exerciseCatalog.map((exercise) => exercise.equipment)),
    ];
    equipmentDropdown.innerHTML = allEquipment
      .map(
        (eq) =>
          `<option value="${eq === "All equipment" ? "" : eq}">${eq}</option>`,
      )
      .join("");
  }

  document
    .getElementById("muscleFilter")
    .addEventListener("change", renderExercises);
  document
    .getElementById("equipmentFilter")
    .addEventListener("change", renderExercises);
  document
    .getElementById("difficultyFilter")
    .addEventListener("change", renderExercises);
  document.getElementById("exerciseGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".favoriteExercise");
    if (!button) return;
    const name = button.dataset.name;
    favoriteExercises = favoriteExercises.includes(name)
      ? favoriteExercises.filter((item) => item !== name)
      : [...favoriteExercises, name];
    saveFavoriteExercises();
    renderExercises();
  });
});
