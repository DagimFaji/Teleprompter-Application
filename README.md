# Teleprompter Application
Overview
This is a web-based teleprompter application designed to help users deliver presentations or speeches with ease. Users can input their script, customize the display, and control the scrolling speed. The application supports both normal and full-screen modes, with a variety of themes and accessibility features.
Built with HTML, JavaScript, and CSS, this project is lightweight and runs directly in the browser without requiring a server.

Features

Script Input and Playback: Paste your script and watch it scroll automatically.
Speed Controls: Adjust scrolling speed using Slow, Normal, Fast, or Duration-Based modes.
Pause/Play Functionality: Start and pause the teleprompter using slide toggles in both normal and full-screen modes.
Full-Screen Mode: Toggle full-screen mode for a distraction-free experience, with controls positioned in the top-right corner.
Theme Customization: Choose from 30 themes, including an auto-cycling mode that changes themes every 10 seconds.
Text Size Adjustment: Select from Small, Medium, or Large text sizes.
Timer: Displays elapsed time during playback.
Warning System: Alerts for invalid inputs (e.g., empty script, invalid duration) with auto-dismiss after 5 seconds.
Responsive Design: Adapts to different screen sizes and modes.
Persistent Settings: Theme preferences are saved across sessions.


Setup Instructions

Clone or Download the Project:

Download the project files or clone the repository to your local machine.


Project Files:Ensure you have the following files in your project directory:

index.html: The home page where users select sample prompts.
script.js: JavaScript for the home page functionality.
prompter.html: The main teleprompter interface.
prompter.js: JavaScript for teleprompter functionality.
styles.css: Styles for the entire application.


Run the Application:

Open index.html in a modern web browser (e.g., Chrome, Firefox, Edge).
No server is required; the application runs entirely on the client side.


Dependencies:

The application uses the Roboto font from Google Fonts. An internet connection is required to load the font. If offline, the fallback fonts (Segoe UI, Arial, sans-serif) will be used.




Usage Instructions

Starting the Teleprompter:

On the home page (index.html), select a sample prompt from the dropdown or navigate directly to prompter.html to input your script.
If no sample is selected, a warning will prompt you to choose one.


Input Your Script:

In prompter.html, paste your script into the text area.
Use special markers like [PAUSE], [SLIDE], or [HIGHLIGHT] to add pauses or emphasis (each marker adds a 2-second pause).


Customize Settings:

Speed: Choose a speed mode (Slow, Normal, Fast, or Duration-Based). For Duration-Based, enter the total duration in seconds.
Text Size: Select Small (16px), Medium (20px), or Large (24px).
Theme: Choose a theme or select "Auto" for automatic theme cycling.


Control Playback:

Use the "Start/Pause" slide toggle to begin or pause the teleprompter.
In full-screen mode, use the slide toggle in the top-right corner to start/pause.


Full-Screen Mode:

Click the "Full Screen" button to enter full-screen mode.
The "Exit Full Screen" button and "Start/Pause" toggle will appear in the top-right corner.
The "Home" button remains in the top-left corner to navigate back to index.html.


Timer:

The timer at the bottom displays the elapsed time in MM:SS format during playback.




File Structure

index.html: Entry point with sample prompt selection.
script.js: Handles navigation and warning logic for the home page.
prompter.html: Main teleprompter interface with controls.
prompter.js: Core logic for teleprompter playback, theme cycling, and speed adjustments.
styles.css: Styling for all pages, including themes and animations.


Dependencies

Google Fonts: The application uses the Roboto font, loaded via:<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">


No other external libraries are required.


Troubleshooting

Theme Not Changing:
Ensure JavaScript is enabled in your browser.
Check the browser console for errors related to prompter.js.


Pause/Play Not Working:
Verify that a valid script is entered.
Ensure the speed settings are valid (e.g., duration > 0 in Duration-Based mode).


Full-Screen Buttons Overlapping:
The buttons are now positioned in the top-right corner with a high z-index to prevent overlap.


Font Not Loading:
If the Roboto font fails to load, the application will fall back to Segoe UI, Arial, or the default sans-serif font.




License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software as per the terms of the license.

Last Updated: May 27, 2025, 05:17 PM EAT
