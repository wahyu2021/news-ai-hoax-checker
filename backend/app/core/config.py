from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding='utf-8', extra='ignore')

    SUMMARIZER_MODEL: str
    DETECTOR_MODEL: str

settings = Settings()