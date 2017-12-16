class SerializableBase < JSONAPI::Serializable::Resource

	def self.relationship_types
		@relationship_types||={}
	end

	def self.has_many(name, options = {}, &block)
		self.relationship_types[name.to_sym]=:has_many
		super(name, options, &block)
	end


	def self.devour_attributes
		hash=self.attribute_blocks.keys.map{|k| [k,'']}.to_h

		hash
	end

end