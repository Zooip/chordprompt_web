class SerializableBase < JSONAPI::Serializable::Resource

	def self.relationship_multiplicity
		@relationship_multiplicity||={}
	end

	def self.has_many(name, options = {}, &block)
		self.relationship_multiplicity[name.to_sym]=:has_many
		super(name, options, &block)
	end

	def self.has_one(name, options = {}, &block)
		self.relationship_multiplicity[name.to_sym]=:has_one
		super(name, options, &block)
	end

	def self.belongs_to(name, options = {}, &block)
		self.relationship_multiplicity[name.to_sym]=:has_one
		super(name, options, &block)
	end


	def self.devour_attributes
		hash=self.attribute_blocks.keys.map{|k| [k,'']}.to_h
		relationship_multiplicity.each do |name, multiplicity|
			hash[name]={
        jsonApi: multiplicity.to_s.camelize(:lower)
			}
		end
		hash
	end

end