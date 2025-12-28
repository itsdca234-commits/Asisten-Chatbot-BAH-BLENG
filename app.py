import streamlit as st
import json

def local_css(file_name):
    with open(file_name) as f:
        st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

st.set_page_config(page_title="Asisten Bot BAH BLENG", page_icon=":crab:")

local_css("style.css")

with st.sidebar:
    st.image("logo_bahbleng.png", width=200)
    st.markdown("---")
    st.markdown("### Tentang Kami")
    st.info("Chatbot ini siap menjawab pertanyaan Anda 24/7.")

def load_knowledge_base(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_response(user_input, knowledge_base):
    for kata_kunci in knowledge_base:
        if kata_kunci in user_input.lower():
            return knowledge_base[kata_kunci]
    return "Maaf, saya tidak mengerti. Coba tanya tentang 'menu', 'buka', 'lokasi', 'cabang', 'reservasi', 'kritik', atau 'saran'."

st.title("💬 Asisten Bot BAH BLENG")
st.write("Halo! Ada yang bisa saya bantu?")

if 'knowledge_base' not in st.session_state:
    st.session_state.knowledge_base = load_knowledge_base("jawaban.json")

user_input = st.text_input("Anda:", key="user_input")

if st.button("Kirim"):
    if user_input:
        response = get_response(user_input, st.session_state.knowledge_base)
        st.text_area("Bot:", value=response, height=100, disabled=True)
    else:
        st.warning("Silakan masukkan pertanyaan Anda.")