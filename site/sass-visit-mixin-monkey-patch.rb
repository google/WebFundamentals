class Sass::Tree::Visitors::Perform < Sass::Tree::Visitors::Base
  # Runs a mixin.
  def visit_mixin(node)
    #include_loop = true
    #handle_include_loop!(node) if @stack.any? {|e| e[:name] == node.name}
    include_loop = false

    @stack.push(:filename => node.filename, :line => node.line, :name => node.name)
    raise Sass::SyntaxError.new("Undefined mixin '#{node.name}'.") unless mixin = @environment.mixin(node.name)

    if node.children.any? && !mixin.has_content
      raise Sass::SyntaxError.new(%Q{Mixin "#{node.name}" does not accept a content block.})
    end

    args = node.args.map {|a| a.perform(@environment)}
    keywords = Sass::Util.map_hash(node.keywords) {|k, v| [k, v.perform(@environment)]}
    splat = node.splat.perform(@environment) if node.splat

    self.class.perform_arguments(mixin, args, keywords, splat) do |env|
      env.caller = Sass::Environment.new(@environment)
      env.content = node.children if node.has_children

      trace_node = Sass::Tree::TraceNode.from_node(node.name, node)
      with_environment(env) {trace_node.children = mixin.tree.map {|c| visit(c)}.flatten}
      trace_node
    end
  rescue Sass::SyntaxError => e
    unless include_loop
      e.modify_backtrace(:mixin => node.name, :line => node.line)
      e.add_backtrace(:line => node.line)
    end
    raise e
  ensure
    @stack.pop unless include_loop
  end
end