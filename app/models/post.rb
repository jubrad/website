class Post < ActiveRecord::Base
	has_attached_file :photo, :styles => {:normal => "275x180>"},
	:url  => "/assets/posts/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/posts/:id/:style/:basename.:extension"
end
