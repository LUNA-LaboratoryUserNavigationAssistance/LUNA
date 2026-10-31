# LUNA — Setup Guide (Every Click Explained)

Do these steps in order, one at a time. Don't skip any.

## Your admin login (write this down somewhere safe)

- **Username:** labadmin
- **Password:** labadmin

---

## PART 1 — Turn on 2 switches in Firebase

You already have a Firebase project called `luna-component-management`. We
just need to switch 2 things on inside it.

1. Open a web browser.
2. Type `console.firebase.google.com` in the address bar and press Enter.
3. Log in with the same Google account you used before.
4. Click the box named **luna-component-management**.
5. On the left side, click **Build**. A small list opens under it.
6. In that list, click **Authentication**.
7. At the top of the page, click **Sign-in method**.
8. Find the row named **Anonymous** and click it.
9. A small box pops up. Click the switch next to **Enable** so it turns ON.
10. Click **Save**.
11. On the left side, click **Build** again, then click **Firestore Database**.
12. At the top of that page, click **Rules**.
13. Click inside the big text box. Press Ctrl+A (or Cmd+A on Mac) to select
    everything, then press Delete.
14. Open the `firestore.rules` file (from this project). Select all its
    text and copy it (Ctrl+C / Cmd+C).
15. Go back to the Firebase page, click in the now-empty box, and paste
    (Ctrl+V / Cmd+V).
16. Click the blue **Publish** button.

Firebase is done.

---

## PART 2 — Create a GitHub account

Skip this whole part if you already have a GitHub account.

17. Open a new browser tab.
18. Type `github.com/join` and press Enter.
19. Type your email address, click **Continue**.
20. Type a password, click **Continue**.
21. Type a username (pick something simple, no spaces — it becomes part of
    your website address later), click **Continue**.
22. Solve the puzzle/robot check if one appears.
23. Click **Create account**.
24. Check your email for a code from GitHub. Copy that code.
25. Paste the code into the GitHub page. You're now logged in.

---

## PART 3 — Create a repository (a project folder)

26. Type `github.com/new` in the address bar, press Enter.
27. Click the box under **Repository name** and type: `luna`
28. Scroll down slightly. Make sure **Public** is selected (not Private).
29. Make sure **Add a README file** is NOT checked/ticked.
30. Click the big green **Create repository** button.

---

## PART 4 — Upload your 3 files

31. You'll land on a mostly empty page for your new `luna` repository.
32. Find the blue link that says **uploading an existing file** and click it.
33. Click **choose your files**.
34. Select these 3 files from your computer (hold Ctrl, or Cmd on Mac,
    while clicking each one, so all 3 are selected together):
    - `index.html`
    - `firestore.rules`
    - `README.md`
35. Wait for the upload to finish — you'll see all 3 file names listed.
36. Scroll down to the bottom of the page.
37. Click the green **Commit changes** button.

---

## PART 5 — Make it a real, live website

38. At the top of your repository page, click **Settings**.
39. On the left side, click **Pages**.
40. Find the dropdown that says **None**. Click it, choose **main**.
41. Leave the other box as **/ (root)**.
42. Click **Save**.
43. Wait about 1 minute, then click your browser's refresh button.
44. Near the top you'll now see green text: **"Your site is live at"**
    followed by a link like `https://your-username.github.io/luna/`.
    That is your real website address — save it somewhere.

---

## PART 6 — Test that it actually works

45. Open your live link (from step 44) in a new tab.
46. Wait a few seconds for the page to load.
47. Log in with:
    - Username: `labadmin`
    - Password: `Luna#Lab2026!`
48. Click **Inventory**, then **Add Component**.
49. Type a name, and a quantity (for example 10), then click **Save**.
50. Click **Students**, then **Add Student**.
51. Fill in a name, a Student ID, an email, and a password, then **Save**.
52. Click **Logout** (top right).
53. Log back in using the Student ID and password you just created.
54. Click **Issue Component**.
55. Type the Student ID, pick your test item, set quantity to 2, click
    **Confirm Issue**.
56. Click **Logout**, log back in as `labadmin`.
57. Click **Inventory** — your test item should now show **8** available
    instead of 10.

If it changed from 10 to 8, everything works correctly and your data is
being saved live, for real, online.

---

## If something looks wrong

- **Stuck on "Loading LUNA..."** → Go back to Part 1, step 9 — the
  Anonymous switch wasn't turned on.
- **"Database access denied"** → Go back to Part 1, steps 13–16 — the
  rules weren't pasted or published.
- **Blank or broken page** → Make sure you opened the `github.io` link
  from Part 5, not a file on your own computer.

---

## One thing to know

Anyone who has your live link can reach the database once they open the
page. That's fine for sharing inside your lab or class — just don't post
the link somewhere fully public unless you're OK with that.
