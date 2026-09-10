# Use the dark rounded Kavi protein-sketch favicon without changing the main config file.
Jekyll::Hooks.register :site, :after_init do |site|
  site.config["icon"] = "kavi-favicon-dark.png"
  site.config["apple_touch_icon"] = "kavi-favicon-dark.png"
end
