var sb = null;

const storedUrl = localStorage.getItem("sb_url");
const storedKey = localStorage.getItem("sb_key");

if (storedUrl && storedKey) {
  document.getElementById("url").value = storedUrl;
  document.getElementById("key").value = storedKey;

  createClient(storedUrl, storedKey);
}

function setConfig(event) {
  const { url, key } = event.target;
  createClient(url.value, key.value);

  localStorage.setItem("sb_url", url.value);
  localStorage.setItem("sb_key", key.value);
}

function createClient(url, key) {
  sb = supabase.createClient(url, key);

  if (typeof onCreated === "function") {
    onCreated();
  }
}

async function setBgColor() {
  const { data, error } = await sb
    .from("configs")
    .select()
    .eq("key", "background_color")
    .limit(1);

  if (error) {
    alert("Error");
    console.error(error);
  } else {
    document.getElementById("target").style.backgroundColor = data[0].value;
  }
}
